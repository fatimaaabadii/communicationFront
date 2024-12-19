'use client';
import { api } from "/src/api/index.js";
import { useToast } from "/src/components/ui/use-toast";
import React, { useState } from "react";
import { setCookie } from "cookies-next";
import { useMutation } from "@tanstack/react-query";
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';

export default function Page() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    try {
      const response = await api.post('/auth/login', { userName, password });
      setCookie("token", response.data, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      toast({
        description: "Connexion réussie",
        className: "bg-green-500 text-white",
        duration: 2000,
        title: "Succès",
      });
      window.location.href = "/";
    } catch (error) {
      toast({
        description: "Échec de connexion",
        variant: "destructive",
        duration: 2000,
        title: "Erreur",
      });
    }
  };

  const { mutate } = useMutation({ mutationFn: login });

  function handleSubmit(event) {
    event.preventDefault();
    mutate();
  }

  return (
    <>
      <style jsx global>{`
        .background {
          display: flex;
          height: 100vh;
        }
        .image-container {
          flex: 2; /* 2/3 */
          position: relative; /* Pour le positionnement de l'image */
        }
        .form-container {
          flex: 1; /* 1/3 */
          padding: 2rem;
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      <div className="background">
        <div className="image-container">
          <Image src="/18.png" alt="Background Image" layout="fill" objectFit="cover" />
        </div>
        <div className="form-container">
          <div className="mb-8 flex justify-center">
            <Image src="/en.png" alt="Logo" width={100} height={20} />
          </div>
          <h2 className="text-2xl text-center font-serif mb-6">Plateforme de Gestion des Publications</h2>
          <h3 className="text-xl font-serif text-center mb-4">Connexion</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-serif">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaUser className="text-gray-400" />
                </span>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                  value={userName}
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-serif">Mot de passe</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="text-gray-400" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-10 focus:outline-none focus:border-blue-500"
                  required
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-800 to-blue-900 hover:bg-blue-900 text-white font-semibold rounded-md py-2 px-4 w-full transition duration-200"
            >
              Connexion
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
