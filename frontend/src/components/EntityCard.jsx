import React from "react";

const EntityCard = ({
  entity,
  editando,
  entityEditado,
  iniciarEdicion,
  guardarEdicion,
  setEntityEditado,
  cancelarEdicion,
  eliminarEntity,
}) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-3">
      <div className="card shadow-sm h-100 d-flex flex-column">
        <div className="card-body d-flex flex-column justify-content-between">
          {editando === entity._id ? (
            <>
              <input
                type="text"
                className="form-control mb-2"
                value={entityEditado}
                onChange={(e) => setEntityEditado(e.target.value)}
              />
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => guardarEdicion(entity._id)}
                >
                  Guardar
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={cancelarEdicion}
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <>
              <h5 className="card-title">{entity.nombre}</h5>
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => iniciarEdicion(entity)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarEntity(entity._id)}
                >
                  Eliminar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntityCard;
