import { ChangeEvent, FormEvent, useState } from "react";
import { About, FormContainer, HomeContainer } from "./styles";
import { useNavigate } from "react-router-dom";

export function Home() {

    const [fullName, setFullName] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail]= useState('')
    const navigate = useNavigate()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        if (name === 'fullName') {
            setFullName(value)
                }
        if (name === 'cpf') {
            setCpf(value)
                }
        if (name === 'email') {
            setEmail(value)
          }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const userData = {
            fullName,
            cpf,
            email
        }
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        }

        try {
            // estou usando um mock de backend para apenas para testar as respsotas o endereço deve ser substituido quando houver um backend feito.
            const response = await fetch('https://queiseproject.free.beeceptor.com/singup', request)
            const data= await response.json()
            
            // no backend colocar uma propriedade sucess na resposta
            if(response.ok && data.success) {
                navigate('/success')
            } else {
                navigate('/failure')
                console.error('fail at creating user:', data.message) // colocar mensagem de erro no backend
            }


        } catch (error) {
            navigate('/failure')
            console.error('Error sending data:', error);
        }
    }

 
    return ( 
       
<HomeContainer>
 
<About>
    <h3>We're Your Notification Squad!</h3>
    <p>Want to know every time your name pops up in the "Diário Oficial do Brasil"? We've got a service that checks the publication daily and sends you an email if your name appears anywhere in it.</p>
    <h3>How Does It Work?</h3>
    <p>Each day, we download the day's issue of the "Diário Oficial do Brasil" and search it for any names in our database. If we find your name, we'll ping you with a notification. <strong>Note: we don't do retroactive searches, so our system kicks in the day after you sign up.</strong> We recommend you manually check the publication on the day you sign up. From tomorrow onwards, we’ve got your back!</p>
    <h3>Want to Be Notified Whenever Your Name Is Mentioned?</h3>
    <p>It's simple! Just fill out the form on this page with your details, and leave the rest to us. We'll handle it from there!</p>
</About>

    <FormContainer onSubmit={handleSubmit}>
    <h3>Please Enter Your Information</h3>
  <label htmlFor="fullName">Full Name</label>
  <input type="text" id="fullName" name="fullName" required value={fullName} onChange={handleInputChange} />

  <label htmlFor="cpf">CPF</label>
  <input type="text" id="cpf" name="cpf" required pattern="\d{11}" title="CPF should be 11 digits without dots or dashes." value={cpf} onChange={handleInputChange} />

  <label htmlFor="email">Email</label>
  <input type="email" id="email" name="email" required value={email} onChange={handleInputChange}/>

  <button type="submit">Submit</button>
    </FormContainer>
</HomeContainer>   
    )
  }
  
  
  