import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import MaterialDatatable from "material-datatable";



export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const [items,setItems] = useState([]);
  const onSubmit = data =>{
    console.log(data);

    axios.post('http://localhost:8000/persona', data)
    .then(res=>{
      console.log(res)
      cargar();
    })
  }

  const cargar = ()=>{

    axios.get('http://localhost:8000/personas')
    .then(res=>{
      setItems(res.data.personas)
      console.log("TODAS LAS PERSONAS:")
      console.log(res)
    })
  }
  

  useEffect(()=>{
    cargar();
  })

  console.log(errors);

  const columns = [
    {   
      name: 'Nonbre', 
      field: 'nombre',
      options: {
          width: 70,
      },
  },
  {
      name: 'Apellido', 
      field: 'apellido',
      options: {
        width: 70,
    },
  }
  ];
  const options = {
    filterType: 'checkbox',
};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="nombre" name="nombre" ref={register({required: true})} />
      <input type="text" placeholder="apellido" name="apellido" ref={register} />

      <input type="submit" />
      

      <div style={{ maxWidth: '90%' }}>
          <MaterialDatatable
          title={"PERSONAS"}
          columns={columns}
          data={items}
          options={options}
        />
      </div>
      
    </form>

  );
}
