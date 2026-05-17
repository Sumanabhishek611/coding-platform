import { useForm } from 'react-hook-form';
 

function Signup(){
     const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Submitteddata=(data)=>{
    console.log(data);
    
  }
    return (
       <form className="flex justify-center flex-col items-center" onSubmit={handleSubmit(Submitteddata)}>
      <input {...register('firstName')} placeholder="enter your name" />
      <input {...register('email')} placeholder="enter your email" />
      
      <input {...register('password')} placeholder="password "/>
      
      <button type='submit' className='btn' >Submit</button>
    </form>
    )
}
export default Signup