//const apiUrl = 'http://localhost:3000/api/items'; // URL de la API para los items

const apiUrl= 'https://crud-nodejs-nine.vercel.app/api/items'

//const apiUrl = window.location.hostname === "localhost"

//const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000/api/items";

// Función para obtener todos los items desde el backend
function getItems() {
  //fetch(apiUrl + 'items')
  fetch(apiUrl)
    .then(response => response.json())
    .then(items => {
      const itemsList = document.getElementById('items-list');
      itemsList.innerHTML = '';

      items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.description}`;
        id=item._id
        const editarBoton = document.createElement('button');
        editarBoton.textContent = 'Editar';
        editarBoton.style.backgroundColor = '#6db9b8';
        editarBoton.addEventListener('click', () => {
          editaritem(item)
          window.location.replace('/#item-form')//nuevo 
          //window.scroll(0,0)
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.style.backgroundColor = '#f76c6c';
        deleteButton.addEventListener('click', () => deleteItem(item._id));

        li.appendChild(editarBoton);
        li.appendChild(deleteButton);

        itemsList.appendChild(li);
      })
    })
}

// Modificamos el event listener del formulario para manejar tanto POST como PUT
document.getElementById('item-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const itemId = e.target.dataset.id;
  
    if (itemId) {
      // Si hay un ID, actualizamos el item existente
       updateItem(itemId, name, description);
    } else {
      // Si no hay ID, creamos un nuevo item
      try {
        const response = fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, description }),
        });
  
        try {
            alert("creado correctamente");
         // e.target.reset();
         document.getElementById('name').value = '';
         document.getElementById('description').value = '';
        //  getItems();
        } catch (error) {
          console.error('Error al agregar el item');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
  

// Función para actualizar un item (PUT)
function updateItem(id, name, description) {
  try {
    const response = fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });

    try {
      getItems(); // Actualizamos la lista de items
      document.getElementById('item-form').reset(); // Limpiamos el formulario
      document.getElementById('item-form').dataset.id = ''; // Limpiamos el ID guardado
    } catch(error) {
      console.error('Error al actualizar el item');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Función para eliminar un item (DELETE)
function deleteItem(id) {
  if (confirm('¿Estás seguro de que quieres eliminar este item?')) {
    try {
      const response = fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });

      try {
        getItems(); // Actualizamos la lista de items
      } catch(error) {
        console.error('Error al eliminar el item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

// Modificamos la función editaritem para trabajar con updateItem
function editaritem(item) {
  document.getElementById('name').value = item.name;
  document.getElementById('description').value = item.description;
  document.getElementById('item-form').dataset.id = item._id;
}


document.getElementById('obtener_items').addEventListener('click', (e) => {
  e.preventDefault();
  getItems();
  
  alert("Items obtenidos");
});

document.getElementById('limpiar_items').addEventListener('click', (e) => {
  e.preventDefault();
  const itemsLists = document.getElementById('items-list');
  itemsLists.innerHTML = '';
  document.getElementById('name').value = '';
  document.getElementById('description').value = '';

});
