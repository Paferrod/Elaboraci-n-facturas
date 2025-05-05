const formulario = document.getElementById("formulario-producto");
const tabla = document.getElementById("tabla-productos");
const totalFinal = document.getElementById("total-final");

let productos = [];

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const cliente = document.getElementById("cliente").value.trim();
  const nif = document.getElementById("nif").value.trim();
  const numeroFactura = document.getElementById("numero-factura").value.trim();
  const fecha = document.getElementById("fecha").value;

  const nombre = document.getElementById("producto").value.trim();
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const precio = parseFloat(document.getElementById("precio").value);
  const iva = parseFloat(document.getElementById("iva").value);

  if (
    !cliente ||
    !nif ||
    !numeroFactura ||
    !fecha ||
    !nombre ||
    isNaN(cantidad) ||
    isNaN(precio) ||
    cantidad <= 0 ||
    precio <= 0
  ) {
    alert("Por favor, rellena todos los campos correctamente.");
    return;
  }

  const subtotal = cantidad * precio;
  const totalConIVA = subtotal * (1 + iva);

  const producto = {
    nombre,
    cantidad,
    precio,
    iva,
    subtotal,
    totalConIVA
  };

  productos.push(producto);
  actualizarTabla();
  formulario.reset();

  document.getElementById("info-factura").innerHTML = `
    <p><strong>N.º Factura:</strong> ${numeroFactura}</p>
    <p><strong>Cliente:</strong> ${cliente} (${nif})</p>
    <p><strong>Fecha:</strong> ${fecha}</p>
  `;
});

function actualizarTabla() {
  tabla.innerHTML = "";

  let totalBase = 0;
  let totalConIVA = 0;

  productos.forEach((p) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${p.nombre}</td>
      <td>${p.cantidad}</td>
      <td>${p.precio.toFixed(2)} €</td>
      <td>${p.subtotal.toFixed(2)} €</td>
      <td>${(p.iva * 100).toFixed(0)}%</td>
      <td>${p.totalConIVA.toFixed(2)} €</td>
    `;

    tabla.appendChild(fila);
    totalBase += p.subtotal;
    totalConIVA += p.totalConIVA;
  });

  totalFinal.innerHTML = `
    <p>Subtotal: ${totalBase.toFixed(2)} €</p>
    <p>IVA total: ${(totalConIVA - totalBase).toFixed(2)} €</p>
    <strong>Total: ${totalConIVA.toFixed(2)} €</strong>
  `;
}
