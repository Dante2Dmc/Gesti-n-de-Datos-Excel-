let idCounter = 1;

    document.getElementById('excelFile').addEventListener('change', function (e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        jsonData.forEach(row => {
          agregarFila(row.Nombre || row.name, row.Edad || row.age);
        });
      };

      reader.readAsArrayBuffer(file);
    });

    function agregarDato() {
      const nombre = document.getElementById("nombre").value.trim();
      const edad = document.getElementById("edad").value.trim();

      if (nombre && edad) {
        agregarFila(nombre, edad);
        document.getElementById("nombre").value = "";
        document.getElementById("edad").value = "";
      } else {
        alert("Por favor completa ambos campos.");
      }
    }

    function agregarFila(nombre, edad) {
      const tabla = document.getElementById("tablaDatos");
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${idCounter++}</td>
        <td>${nombre}</td>
        <td>${edad}</td>
        <td>
          <button onclick="eliminarFila(this)" class="text-red-600 hover:text-red-800">Eliminar</button>
        </td>
      `;

      tabla.appendChild(fila);
    }

    function eliminarFila(boton) {
      const fila = boton.parentNode.parentNode;
      fila.remove();
    }