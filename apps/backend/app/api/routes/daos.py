import time
import uuid
from typing import Any

from fastapi import APIRouter, BackgroundTasks, HTTPException
from sqlmodel import Session

from app import crud
from app.api.deps import SessionDep
from app.core.db import engine 
from app.models import DAO, DAOCreate, DAOPublic, DAOStatus

router = APIRouter(prefix="/daos", tags=["daos"])


def run_envo_indexing(dao_id: uuid.UUID):
    """
    This is the background task. It simulates a long-running indexing process.
    IMPORTANT: It creates its own database session.
    """
    print(f"Starting indexing for DAO ID: {dao_id}")
    
    # Create a new session for the background task
    with Session(engine) as session:
        dao = session.get(DAO, dao_id)
        if not dao:
            print(f"DAO {dao_id} not found in background task.")
            return

        # TODO: Replace this sleep with the actual Envio indexing logic.
        # This would involve:
        # 1. Generating the Envio config file based on the DAO contract address.
        # 2. Running the Envio process using subprocess.
        print(f"Simulating Envio indexing for {dao.contract_address}...")
        time.sleep(15) # Simulate a 15-second indexing job

        # Once done, update the status.
        dao.status = DAOStatus.COMPLETED
        session.add(dao)
        session.commit()
        print(f"Indexing complete for DAO ID: {dao_id}")


@router.post("/", response_model=DAOPublic)
def create_dao(
    *,
    session: SessionDep,
    dao_in: DAOCreate,
    background_tasks: BackgroundTasks,
) -> Any:
    """
    Create a new DAO and start the indexing process in the background.
    """
    dao = session.exec(DAO).filter(DAO.contract_address == dao_in.contract_address).first()
    if dao:
        raise HTTPException(
            status_code=409,
            detail="A DAO with this contract address already exists.",
        )

    # Create the DAO with an initial "INDEXING" status
    new_dao = crud.create_dao(session=session, dao_in=dao_in)
    new_dao.status = DAOStatus.INDEXING
    session.add(new_dao)
    session.commit()
    session.refresh(new_dao)

    # Add the long-running task to the background
    background_tasks.add_task(run_envo_indexing, new_dao.id)

    # Return an immediate response to the user
    return new_dao