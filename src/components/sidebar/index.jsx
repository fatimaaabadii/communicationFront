import Link from "next/link";
import { useRouter } from 'next/router';
import { FaUser, FaUsers } from "react-icons/fa";
import { MdDevices } from "react-icons/md";
import { FaUserFriends } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa';
import { FaMapMarker } from 'react-icons/fa';
import { BiMapPin } from 'react-icons/bi';
import { FaShareAlt } from 'react-icons/fa';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaSitemap } from 'react-icons/fa';
import { useQuery } from "@tanstack/react-query";
import { api, getDelegations, getUsers, getCurrentUser } from "/src/api/index.js";
import { FaAddressBook } from 'react-icons/fa';
import { FaFolderOpen } from 'react-icons/fa';
import { FaBookReader    } from 'react-icons/fa';
import {FaUserGraduate,FaBuilding , FaBook, FaNewspaper , FaFileAlt ,FaFeatherAlt , FaCheckCircle   } from 'react-icons/fa';
import { FaChartBar } from 'react-icons/fa';
import { setCookie, deleteCookie } from "cookies-next";
import Image from 'next/image';
const Sidebar = () => {
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser(),
  });
  
  
  
  const roles = [
    
    {
      value: "1",
      label: "Siège",
    },
    {
      value: "2",
      label: "Délégué",
    },
  
    {
      value: "3",
      label: "Coordinateur",
    },
  
     {
      value: "4",
      label: "Service technique",
    },
   
  ];
  return (
    
    
     
    <nav className="flex items-center justify-between bg-blue-900 text-white h-20 px-6">
      <img src="en.png" alt="Logo" className="h-10" />

      { ( userData?.roles === "SIEGE_ROLES" || userData?.roles === "DELEGUE_ROLES") && (   
     <div className="flex items-center">
            <Link
              href="/"
              
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-white-800 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-1">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </span>
              <span className="ml-2 text-l font-serif tracking-wide truncate">
                 Accueil
              </span>
            </Link>
            </div>)}
          {/*<li>
            <Link
              href="/partenaire"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
              <FaUserFriends className="w-8 h-4" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
              Gestion des Partenaires
              </span>
            </Link>
  </li>*/}
  {/*{ (userData?.roles === "ADMIN_ROLES" || userData?.roles === "DELEGUE_ROLES" || userData?.roles === "COORDINATEUR_Roles" || userData?.roles === "SIEGE_ROLES") && (
          <li>
            <Link
              href="/partenariat"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-1">
              <FaHandshake  className="w-8 h-4" />
              </span>
              <span className="ml-2 text-l font-serif tracking-wide truncate">
              Gestion des Partenariats
              </span>
            </Link>
          </li>
  )}
          
          { (userData?.roles === "ADMIN_ROLES" || userData?.roles === "TECHNIQUE_ROLES") && (

          <li>
            <Link
              href="/delegation"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-1">
              <FaSitemap className="w-8 h-4" />
              </span>
              <span className="ml-2 text-l font-serif tracking-wide truncate">
              Gestion des délégations
              </span>
            </Link>
            
          </li>


          



          )}
           <li>
            <Link
              href="/annuaire"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-1">
              <FaAddressBook   className="w-8 h-4" />
              </span>
              <span className="ml-2 text-l font-serif tracking-wide truncate">
              Annuaire des délégations
              </span>
            </Link>
            
          </li>
          {/* <li>
            <Link
              href="/commune"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
              <BiMapPin className="w-8 h-4" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
              Gestion des communes
              </span>
            </Link>
          </li>*/}
      { ( userData?.roles === "DELEGUE_ROLES" || userData?.roles === "COORDINATEUR_ROLES" || userData?.roles === "ADMIN_ROLES") && (  
 <div className="flex items-center">
            <Link
              href="/articles"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-white-800 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-1">
              <FaFileAlt   className="w-8 h-4" />
              </span>
              <span className="ml-2 text-l font-serif tracking-wide truncate">
              Ajouter un article
              </span>
            </Link>
          </div>
        )}
          { ( userData?.roles === "SIEGE_ROLES" || userData?.roles === "ADMIN_ROLES") && (  
 <div className="flex items-center">
            <Link
              href="/validation"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-white-800 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-1">
              <FaCheckCircle className="w-8 h-4" />
              </span>
              <span className="ml-2 text-l font-serif tracking-wide truncate">
              Correction et Validation d&apos;articles
              </span>
            </Link>
          </div>
        )}

 {( userData?.roles === "ADMIN_ROLES") && (  
 <div className="flex items-center">
            <Link
              href="/statistiques"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-white-800 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-1">
              <FaChartBar className="w-8 h-4" />
              </span>
              <span className="ml-2 text-l font-serif tracking-wide truncate">
              Statistiques
              </span>
            </Link>
          </div>
        )}
       {/* <div className="flex items-center">
            <Link
              href="/attachments"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-white-800 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-1">
              <FaFileAlt   className="w-8 h-4" />
              </span>
              <span className="ml-2 text-l font-serif tracking-wide truncate">
              Gestion des pieces jointes
              </span>
            </Link>
          </div>/*}
         {/* { ( userData?.roles === "DELEGUE_ROLES" || userData?.roles === "COORDINATEUR_Roles") && (  
          <div className="flex items-center">
            <Link
              href="/etablissements"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-white-800 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-1">
              <FaBuilding      className="w-8 h-4" />
              </span>
              <span className="ml-2 text-l font-serif tracking-wide truncate">
              Gestion des Établissements
              </span>
            </Link>
          </div>)}
{/* (userData?.roles === "ADMIN_ROLES" || userData?.roles === "DELEGUE_ROLES" || userData?.roles === "COORDINATEUR_Roles") && (
          <li>
            <Link
              href="/coordonnees"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-1">
              <FaPhone   className="w-8 h-4" />
              </span>
              <span className="ml-2 text-l font-serif tracking-wide truncate">
              Coordonnées de ma structure
              </span>
            </Link>
            
          </li>

)}*/}

{/*
{(userData?.roles === "Technique_ROLES" && (
         <div className="flex items-center">
            <Link
              href="/utilisateurs"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-white-800 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-1">
                <FaUsers className="w-5 h-5" />
              </span>
              <span className="ml-2 text-l font-serif tracking-wide truncate">
              Gestion des Utilisateurs
              </span>
            </Link>
          </div>
       
        ))}*/}

{ ( userData?.roles === "SIEGE_ROLES" || userData?.roles === "DELEGUE_ROLES") && (   
        <div className="py-4 space-y-1">
          <Link
            href="/user"
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-white-800 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
          >
            <span className="inline-flex justify-center items-center ml-1">
              <FaUser className="w-5 h-5" />
            </span>
            <span className="ml-2 text-l font-serif tracking-wide truncate">
              Mon Profil
            </span>
          </Link>
        </div>)}
        <div className="ml-4 hover:text-gray-700 font-serif hover:bg-gray-400 p-2 rounded-full">
                        <button onClick={() => {
                          deleteCookie("token");
                          window.location.href = "/login";
                        }}>Déconnexion</button>
                      </div>
    </nav>
  );
};

export default Sidebar;
