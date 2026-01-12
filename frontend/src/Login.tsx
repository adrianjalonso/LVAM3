import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useLocation } from "react-router-dom";
import * as React from "react";


const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

function FormLogin({setIsLogin,email,setEmail,senha,setSenha}:{setIsLogin: React.Dispatch<React.SetStateAction<boolean>>,email: string,setEmail: React.Dispatch<React.SetStateAction<string>>,senha: string,setSenha: React.Dispatch<React.SetStateAction<string>>}){



function cadastrar(){
fetch(`${import.meta.env.VITE_API_URL}/user/login`,{
  method: "POST",
  headers: {
    "Content-Type": "application/json" 
  },
  body:JSON.stringify({
    email: email,
    senha: senha
  })
})
.then(res=> res.json())
.then(data => {
  console.log("Respuesta ", data)
})
.catch(err=>{
  console.error("Error:",err)
})
} 

  return(
  <div>
            <div className="flex flex-col gap-3 ">
              <h1 className="text-3xl text-escuro text-text-main font-black leading-tight">
                Bem-vindo(a) de volta!
              </h1>
              <p className="text-base font-normal leading-normal">
                Junte-se a nós e fique por dentro das últimas tendências da moda.
              </p>
            </div>
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium leading-normal pb-2">
                  E-mail
                </p>
                <input
                  onChange={(e)=>setEmail(e.target.value)}
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden border rounded-lg focus:outline-0 focus:border-primary h-14 p-3 text-base font-normal leading-normal"
                  placeholder="Digite seu e-mail ou nome de usuário"
                  type="text"
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium leading-normal pb-2">Senha</p>
                <div className="flex flex-col ">
                  <input
                  onChange={(e)=>setSenha(e.target.value)}
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden border rounded-lg focus:outline-0 focus:border-primary h-14 p-3 text-base font-normal leading-normal pr-2"
                    placeholder="Digite sua senha"
                    type="password"
                  />
                  <div className=" flex w-8 justify-center items-center relative left-[350px] -top-7">
                    <i className=" text-gray-500 fa-solid fa-eye"></i>
                  </div>
                </div>
              </label>
            </div>
            <div className="flex justify-between items-center mt-2">
              <label className="flex gap-3 items-center">
                <input
                  className=" accent-primary rounded  focus:outline-none focus:ring-offset-0"
                  type="checkbox"
                />
                <p>Lembrar-me</p>
              </label>
              <a
                className="text-primary text-sm font-medium hover:underline"
                href="#"
              >
                Esqueceu a senha?
              </a>
            </div>
            <button
              onClick={cadastrar}
              className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-base font-bold leading-normal hover:bg-amber-800 transition-colors"
            >
              Entrar
            </button>
            
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300 " />
              <span className="mx-4 text-sm text-text-secondary">ou</span>
              <hr className="flex-grow border-t border-gray-300 " />
            </div>
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-center gap-3 w-full h-12 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200  transition-colors">
                <div className="size-6 text-center">
                  <i className="fa-brands fa-google text-primary"></i>
                </div>
                <span className="text-text-main  font-medium">
                  Entrar com Google
                </span>
              </button>
              <button className="flex items-center justify-center gap-3 w-full h-12 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200  transition-colors">
                <div className="size-6 text-center">
                  <i className="fa-brands fa-facebook-f text-blue-600"></i>
                </div>
                <span className="text-text-main  font-medium">
                  Entrar com Facebook
                </span>
              </button>
            </div>
            <div>
              <p className="text-xs text-escuro">
                Ao continuar, você concorda com nossos{" "}
                <a className="text-primary hover:underline" href="#">
                  Termos de serviço
                </a>{" "}
                e
                <a className="text-primary hover:underline" href="#">
                  {" "}
                  Política de Privacidade
                </a>
                .{" "}
              </p>
            </div>
          </div>)
}

function FormCadastro( {isLogin,setIsLogin}: {isLogin:boolean,setIsLogin:React.Dispatch<React.SetStateAction<boolean>>}){

  const [nomeCadastro, setNomeCadastro] = useState<string>("")
  const [emailCadastro, setEmailCadastro] = useState<string>("")
  const [senhaCadastro, setSenhaCadastro] = useState<string>("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [errorSenha, setErrorSenha] = useState<string|null>(null)
  const [checkboxAcordo, setCheckboxAcordo] = useState(false)
  const navigate= useNavigate();

  async function cadastrar() {
    if(!checkboxAcordo){
      alert("Aceitar termos!")
      return}

    if(senhaCadastro!==confirmarSenha){
      setErrorSenha("As senhas não coincidem")
      return
    }
    setErrorSenha(null);

      
    
     fetch("http://localhost:3000/user/cadastro",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        name: nomeCadastro,
        email: emailCadastro,
        senha: senhaCadastro
      }) 
     })
     .then(res => {
      if (!res.ok){
         throw new Error("Erro no cadastro");
      }
        return res.json();
    }
  ).then(data => {
      console.log("Respuesta ", data)
      if(data){
        navigate("/PaginaPrincipal")
        setIsLogin(true)
      }
     }).catch(err =>{
      console.error("Error", err)
     })
    } 
  

  useEffect(()=>{
    if (confirmarSenha.length===0){
      setErrorSenha(null)
    } else if (senhaCadastro!==confirmarSenha){
      setErrorSenha("As senhas não coincidem")
    } else {
      setErrorSenha(null)
    }
  },[senhaCadastro, confirmarSenha])

  return(
    <div className="flex gap-2 flex-col">
     <div >
       <label className="flex flex-col">
        <p className="text-base font-medium leading-normal pb-2">Nome:</p>
       <input onChange={(e)=> setNomeCadastro(e.target.value)} className="flex w-full min-w-0 flex-1 resize-none overflow-hidden border rounded-lg focus:outline-0 focus:border-primary h-14 p-3 text-base font-normal leading-normal" type="text"/>
       </label>
     </div>
     <div >
       <label className="flex flex-col">
        <p className="text-base font-medium leading-normal pb-2">E-mail:</p>
        <input onChange={(e)=> setEmailCadastro(e.target.value)} className="flex w-full min-w-0 flex-1 resize-none overflow-hidden border rounded-lg focus:outline-0 focus:border-primary h-14 p-3 text-base font-normal leading-normal" autoComplete="email" type="email"/>
        </label>
     </div>
     <div>
       <label className="flex flex-col">
        <p className="text-base font-medium leading-normal pb-2">Senha:</p>
        <input onChange={(e)=> setSenhaCadastro(e.target.value)} className="flex w-full min-w-0 flex-1 resize-none overflow-hidden border rounded-lg focus:outline-0 focus:border-primary h-14 p-3 text-base font-normal leading-normal" type="password"/>
        </label>
     </div>
     <div>
       <label className="flex flex-col">
        <p className="text-base font-medium leading-normal pb-2">Confirmar senha:</p>
        <input onChange={(e)=> setConfirmarSenha(e.target.value)} className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden border rounded-lg focus:outline-0 focus:border-primary h-14 p-3 text-base font-normal leading-normal ${errorSenha ? "border-red-500": "border-gray-300"}`} type="password"/>
        {errorSenha && (
      <span className="text-red-500 text-sm mt-1">
        {errorSenha}
      </span>
    )}
        </label>
     </div>
     <label className="flex flex-row-reverse justify-end gap-2">
      <p>Li e concordo com os termos</p>
      <input onChange={(e)=>setCheckboxAcordo(e.target.checked)} className="accent-primary rounded  focus:outline-none focus:ring-offset-0" type="checkbox" value="si" />
      </label>
      <input onClick={cadastrar} type="submit" className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-base font-bold leading-normal hover:bg-amber-800 transition-colors" value="Cadastrar" />
    </div>
  )
}



function Login({isLogin,setIsLogin,email,setEmail,senha,setSenha}:{isLogin: boolean,setIsLogin:React.Dispatch<React.SetStateAction<boolean>>,email: string,setEmail: React.Dispatch<React.SetStateAction<string>>,senha: string, setSenha: React.Dispatch<React.SetStateAction<string>>}) {
  const location = useLocation();
  const mensagemAlert = location.state?.message;
  const [abaLogin, setAbaLogin] = useState(true)


  return (
    <> 
      <main className="flex flex-col justify-center items-center max-h-full bg-light pt-16 pb-6">
        { mensagemAlert && <div className="bg-amber-100 border border-amber-400 text-amber-700 px-4 py-3 rounded relative mb-4 text-center text-sm  font-medium animate-pulse">
            {mensagemAlert}
          </div>}
        <section className=" flex flex-col rounded-xl shadow-lg pt-4 p-8 w-full  max-w-md bg-white gap-4 mb-4">
          <div className="flex justify-evenly mb-6 transition-colors ">
            <div className="flex justify-center items-center flex-col w-full">
              <p onClick={()=> setAbaLogin(true)} className={` transition-all duration-300 ease-in-out pt-2 pb-2 w-32 py-3 ${abaLogin ? "text-primary": "text-[#888888]"} text-lg font-bold text-center`}>
                Entrar
              </p>
              <hr className={` border-primary w-full transition-all duration-300  ${abaLogin ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`} />
            </div>
            <div className="flex justify-center  items-center flex-col w-full">
              <p onClick={()=> setAbaLogin(false)} className={`pt-2 pb-2 w-32 py-3 ${abaLogin ? "text-[#888888]": "text-primary"} text-lg font-bold text-center`}>
                Cadastrar-se
              </p>
              <hr className={` border-primary w-full ${!abaLogin ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`} />
            </div>
          </div>
          {abaLogin ? <FormLogin senha={senha} setSenha={setSenha} email={email} setEmail={setEmail} setIsLogin={setIsLogin} />: <FormCadastro isLogin={isLogin} setIsLogin={setIsLogin} />}
        </section>
      </main>
    </>
  );
}

export default Login;
