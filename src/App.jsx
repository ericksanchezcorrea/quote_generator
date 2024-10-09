import { useState, useEffect } from "react";
import "./App.css";
import PDF from "./component/PDF";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';

function App() {
  const [form, setForm] = useState({
    numero: "",
    fecha: "",
    atencion: "",
    asunto: "",
    cantidad: "",
    precioUnitario: "",
    condiciones: [
      { texto: "Validez de cotización: 30 días.", checked: true },
      { texto: "Precios expresados en soles peruanos.", checked: true },
      { texto: "Forma de pago: Factura de 30 días.", checked: true },
    ],
  });

  const [editandoCondicion, setEditandoCondicion] = useState(null);
  const [textoBoton, setTextoBoton] = useState("Agregar");

  useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, fecha: fechaActual() }));
  }, []);

  function fechaActual() {
    const fecha = new Date();
    const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
    return fecha.toLocaleDateString("es-ES", opciones);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const nuevasCondiciones = form.condiciones.map((condicion) =>
        condicion.texto === name
          ? { ...condicion, checked: checked }
          : condicion
      );
      setForm((prevForm) => ({
        ...prevForm,
        condiciones: nuevasCondiciones,
      }));
    } else {
      if (name === "precioUnitario" || name === "cantidad" || name === "numero") {
        const newValue = value.replace(/[^0-9.]/g, "");
        setForm((prevForm) => ({ ...prevForm, [name]: newValue }));
        return;
      }

      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  }

  function agregarCondicion(condicionTexto) {
    if (editandoCondicion !== null) {
      const nuevasCondiciones = [...form.condiciones];
      nuevasCondiciones[editandoCondicion] = { texto: condicionTexto, checked: true };
      setForm((prevForm) => ({
        ...prevForm,
        condiciones: nuevasCondiciones,
      }));
      setEditandoCondicion(null);
      setTextoBoton("Agregar");
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        condiciones: [
          ...prevForm.condiciones,
          { texto: condicionTexto, checked: true },
        ],
      }));
    }
  }

  function eliminarCondicion(index) {
    setForm((prevForm) => {
      const nuevasCondiciones = [...prevForm.condiciones];
      nuevasCondiciones.splice(index, 1);
      return { ...prevForm, condiciones: nuevasCondiciones };
    });
  }

  function editarCondicion(index, condicionTexto) {
    document.getElementById("nuevaCondicion").value = condicionTexto;
    setEditandoCondicion(index);
    setTextoBoton("Guardar cambios");
  }

  const [showPdf, setshowPdf] = useState(false);

  const handleClose = () => setshowPdf(false);
  const handleShow = () => setshowPdf(true);

  return (
    <>
      <h1 className="display-5 text-center mb-2">Cotizador</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          marginLeft: "50px"
        }}
      >
        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
          <Form.Label htmlFor="numeroInput">Número:</Form.Label>
          <Form.Control
            id="numeroInput"
            type="text"
            name="numero"
            value={form.numero}
            onChange={handleChange}
            style={{width:'100px'}}
          />
        </div>
        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
          <Form.Label htmlFor="fechaInput">Fecha:</Form.Label>
          <Form.Control
            id="fechaInput"
            type="text"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            style={{width:'120px'}}
          />
        </div>

        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
          <Form.Label htmlFor="asuntoInput">Asunto:</Form.Label>
          <Form.Control
            id="asuntoInput"
            type="text"
            name="asunto"
            value={form.asunto}
            onChange={handleChange}
            style={{ width: "1000px" }}
          />
        </div>

        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
          <Form.Label htmlFor="atencionInput">Atención:</Form.Label>
          <Form.Control
            id="atencionInput"
            type="text"
            name="atencion"
            value={form.atencion}
            onChange={handleChange}
            style={{ width: "300px" }}
          />
        </div>

        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
          <Form.Label htmlFor="cantidadInput">Cantidad:</Form.Label>
          <Form.Control
            id="cantidadInput"
            type="text"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
            style={{ width: "100px" }}
          />
        </div>

        <div  style={{display:'flex', gap:'10px', alignItems:'center'}}>
          <Form.Label htmlFor="precioUnitarioInput">P. unitario: </Form.Label>  
          <Form.Control
            id="precioUnitarioInput"
            type="text"
            name="precioUnitario"
            value={form.precioUnitario}
            onChange={handleChange} 
            style={{ width: "100px" }}
          />
        </div>

        <p style={{fontWeight:'bold', textDecoration:'underline'}}>Condiciones:</p>

        {/* Renderizando los checkboxes dinámicamente con botón de eliminar y editar */}
        <div>
          {form.condiciones.map((condicion, index) => (
            <div
              key={index}
              style={{ display: "flex", alignItems: "center" }}
            >
              <label>
                <input
                  type="checkbox"
                  name={condicion.texto}
                  checked={condicion.checked}
                  onChange={handleChange}
                />
                {condicion.texto.charAt(0).toUpperCase() + condicion.texto.slice(1)}{" "}
              </label>
              <Button
                variant="outline-danger"
                onClick={() => eliminarCondicion(index)}
                style={{ marginLeft: "10px" }}
              >
                Eliminar
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => editarCondicion(index, condicion.texto)}
                style={{ marginLeft: "10px" }}
              >
                Editar
              </Button>
            </div>
          ))}
        </div>

        {/* Input para agregar nuevas condiciones */}
        <div>
          <input
            type="text"
            id="nuevaCondicion"
            placeholder="Nueva condición"
            style={{ width: "600px" }}
          />
          <Button
            onClick={() => {
              const nuevaCondicion = document
                .getElementById("nuevaCondicion")
                .value.trim();
              if (nuevaCondicion) {
                agregarCondicion(nuevaCondicion);
                document.getElementById("nuevaCondicion").value = "";
              }
            }}
          >{textoBoton}</Button>
        </div>

        <div>
          {
            !showPdf &&
          <Button type="submit"  variant='success' onClick={handleShow}>
            Mostrar
          </Button>
          }
        </div>
      </div>
      
      <div>
        <Modal show={showPdf} onHide={handleClose}  size="lg">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {showPdf && <PDF datos={form} />}
        </Modal>
      </div>

    </>
  );
}

export default App;
