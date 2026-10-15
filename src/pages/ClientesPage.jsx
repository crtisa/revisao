import { useState } from "react";
import ClienteForm from "../components/ClienteForm";

const clientesMockados = [
    {
        id:1,
        nome:'Isabella',
        cpf:'123.456.789-10',
        telefone:"(19) 99785-6104",
        email:"isabella@gmail.com"
    },
     {
        id:2,
        nome:'Lara',
        cpf:'123.456.457-33',
        telefone:"(19) 98148-7606",
        email:"lara@gmail.com"
    },
]

export default function ClientesPage(){
    const [clientes, setClientes] = useState(clientesMockados);
    const [clienteEditando, setClienteEditando] = useState(null);

    const handleCancelarEdicao = ()=> {
        setClienteEditando(null);
    }

    const handleSalvar = (dadosClientes)=>{
        if (clienteEditando) {
            setClientes(clientes => clientes.map(
                cliente => cliente.id == clienteEditando.id ? {...
                    dadosClientes, id: clienteEditando.id} : cliente
            ))
        } else {
            const novoCliente = {
                ...dadosClientes,
                id: Date.now()
            };

            setClientes(clientes => [...clientes, novoCliente])
        }
    }

    return(
        <div>
            <h3>Gerenciamento de cLientes</h3>

            <ClienteForm 
                clienteEditando={clienteEditando}
                onSalvar={clienteEditando}
                onCancelar={handleCancelarEdicao}
            />
            
            <table>
                <thead>
                    <tr>
                        <th>Nome do Cliente</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientes.map(
                            cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>{cliente.email}</td>
                                    <td>
                                        <button onClick={()=> {setClienteEditando}}>✏️</button>
                                    </td>

                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}