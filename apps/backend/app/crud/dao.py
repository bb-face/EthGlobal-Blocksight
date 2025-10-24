from typing import Any
 
from sqlmodel import Session, select
 
from app.models import DAO, DAOCreate

def create_dao(*, session: Session, dao_in: DAOCreate) -> DAO:
    db_obj = DAO.model_validate(dao_in)
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj