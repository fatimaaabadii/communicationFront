"use client";
/*import PartnershipsPieChart from '@/components/Piechart';
import PartnershipsChart from '@/components/chart';
import { FaUserFriends } from 'react-icons/fa';

import Beneficiaires from "@/components/beneficiaires";
import Etablissements from "@/components/etablissements";*/


import Footer from '/src/components/Footer';
import Card from "/src/components/card";
import ArticleCarousel from "/src/components/swiper/swiper";
import { IoGift } from "react-icons/io5";
import { FaBriefcase } from "react-icons/fa";
import { MdDirectionsWalk } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaHandshake } from 'react-icons/fa';
import { FaMapMarker } from 'react-icons/fa';
import { BiMapPin } from 'react-icons/bi';
import { MdCheckCircle } from 'react-icons/md';
import { api ,getCurrentUser, getArticles} from '/src/api';
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { FaChartLine , FaHourglassHalf  } from "react-icons/fa";
import { FaChartBar,FaExclamationCircle,FaTimesCircle   } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";
import { IoIosAnalytics } from "react-icons/io";
import { MdPieChart } from "react-icons/md";
import { BsChartDonut } from "react-icons/bs";
import { TiChartBarOutline } from "react-icons/ti";
import { BiPieChart } from "react-icons/bi";

/*const partnershipData = [
  { domain: 'Éducation', count: 25 },
  { domain: 'Santé', count: 30 },
  { domain: 'Technologie', count: 60 },
  { domain: 'Sensibilisation', count: 20 },
  { domain: 'Construction', count: 10 },
  { domain: 'Equipement', count: 5 },
  { domain: 'Sport', count: 30 },
  { domain: 'Ecoute et orientation', count: 15 },
  // et ainsi de suite...
];
const partnershipsData = {
  'Délegation 1': 10,
  'Délegation 2': 20,
  'Délegation 3': 15,
  // Ajoutez d'autres données de partenariats par délégations ici
};
async function getSuivisByPartenariatId(partenariatId) {
    // Appel à votre API pour récupérer les suivis par ID de partenariat
    const token = getCookie('token');
    const response = await api.get(`/suivie/byPartenariatid/${partenariatId}`, {
        
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
}

// Fonction pour récupérer les partenariats


// Fonction pour calculer le nombre de partenariats actifs
async function calculerNombrePartenariatsActifs(partenariats) {
    if (!partenariats || !Array.isArray(partenariats)) {
        console.error("Les données de partenariats ne sont pas définies ou ne sont pas dans le format attendu.");
        return;
    }

    let nombrePartenariatsActifs = 0;

    // Parcourir chaque partenariat
    for (const partenariat of partenariats) {
        try {
            // Récupérer les suivis pour ce partenariat
            const suivis = await getSuivisByPartenariatId(partenariat.id);

            // Vérifier s'il y a des suivis pour ce partenariat
            if (suivis.length > 0) {
                // Trouver le dernier suivi en récupérant l'élément à l'index le plus élevé
                const dernierSuivi = suivis[suivis.length - 1];

                // Vérifier si l'état du dernier suivi est "actif"
                if (dernierSuivi.etat === "Active") {
                    nombrePartenariatsActifs++;
                }
            }
        } catch (error) {
            console.error(`Erreur lors de la récupération des suivis pour le partenariat ${partenariat.id}:`, error);
        }
    }
    console.log("Nombre de partenariats actifs:", nombrePartenariatsActifs);
    return nombrePartenariatsActifs;}



    async function calculerNombreProjetsOperationnels(partenariats) {
        if (!partenariats || !Array.isArray(partenariats)) {
        console.error("Les données de partenariats ne sont pas définies ou ne sont pas dans le format attendu.");
        return;
    }

    let nombreProjetsOperationnels = 0;

    // Parcourir chaque partenariat
    for (const partenariat of partenariats) {
        try {
            // Récupérer les suivis pour ce partenariat
            const suivis = await getSuivisByPartenariatId(partenariat.id);

            // Vérifier s'il y a des suivis pour ce partenariat
            if (suivis.length > 0) {
                // Trouver le dernier suivi en récupérant l'élément à l'index le plus élevé
                const dernierSuivi = suivis[suivis.length - 1];

                // Vérifier si l'état du dernier suivi est "actif"
                if (dernierSuivi.projetOperationel === "Oui") {
                    nombreProjetsOperationnels++;
                }
            }
        } catch (error) {
            console.error(`Erreur lors de la récupération des suivis pour le partenariat ${partenariat.id}:`, error);
        }
    }
    console.log("Nombre de partenariats opérationels:", nombreProjetsOperationnels);
    return nombreProjetsOperationnels;}*/

const Page = () => {
    /*const [nombrePartenariatsActifs, setNombrePartenariatsActifs] = useState(null);
    const [nombreProjetsOperationnels, setNombreProjetsOperationnels] = useState(null);

    
    
   

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();*/
    const { data: articles,refetch} = useQuery({
      queryKey: ['articles'],
      queryFn: getArticles(),
    });

    console.log("articles", articles);
          const getTotalPartenariats = () => {
        if (articles) {
            //const filteredEta = bene.filter(bene => bene.delegation.trim() === userData.delegation.trim());
            // Retourner la longueur du tableau filtré
            return articles.length;// Utilisez simplement la propriété length pour compter le nombre total d'éléments dans le tableau "bene"
        }
        return 0; 
         // Retourne 0 si les données de partenariats ne sont pas encore chargées
    };



  

          const getTotaletab = () => {
        if (articles) {
          let totalNonValide = 0;
          for (let i = 0; i < articles.length; i++) {
            if (articles[i].etat.trim() === "Non validé") {
              totalNonValide++;
            }
          }
          return totalNonValide;
        }
        return 0;
      };
      


      const getTotaletab1 = () => {
        if (eta) {
          // Filtrer les éléments de eta qui ont une délégation correspondant à userData.delegation
          
          // Retourner la longueur du tableau filtré
          return eta.length;
        }
        return 0;
      };
    const { data: userData } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser(),
      });
    


        const getTotalvalide = () => {
            if (articles) {
              let totalNonValide = 0;
              for (let i = 0; i < articles.length; i++) {
                if (articles[i].etat.trim() === "Validé") {
                  totalNonValide++;
                }
              }
              return totalNonValide;
            }
            return 0;
          };
          








          const getTotalencorevalide = () => {
            if (articles) {
              let totalEnCoursValidation = 0;
              for (let i = 0; i < articles.length; i++) {
                if (articles[i].etat.trim() === "En cours de validation") {
                  totalEnCoursValidation++;
                }
              }
              return totalEnCoursValidation;
            }
            return 0;
          };
          
     
 
   
 
    


  return (
      <div className="bg-white">
          <div className="p-6" >
         
              <div className="flex justify-center space-x-4" >
                  <Card
                
                name={`Nombre Total d'articles`}
                      count={getTotalPartenariats()}
                      svg={<FaChartLine size={32} />}
                  />
                {/*  <Card
                      name={`Nombre total d'articles non acceptés pour publication`}
                      count={getTotaletab()}
                      svg={<FaExclamationCircle size={32} />}
          />*/}
                  
                  <Card
                
                name={`Nombre total d'articles validés et publiés`}
                      count={getTotalvalide()}
                      svg={<MdCheckCircle  size={32} />}
                  />
                 

                 <Card
                
                name={`Nombre d'articles en cours de validation`}
                      count={getTotalencorevalide()}
                      svg={<FaHourglassHalf   size={32} />}
                  />
                  


                  <Card
                      name={`Nombre total d'articles non acceptés pour publication`}
                      count={getTotaletab()}
                      svg={<FaExclamationCircle size={32} />}
          />
              </div>



             
              <div>
      
      <ArticleCarousel  />
               </div>
               
               <div className="container mx-auto px-4 mt-20 mb-40">
                <h2 className="text-3xl font-bold text-center mb-16">Découvrez Notre Application</h2>
                <h3 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'semi-bold', color: '#333', textAlign: 'center', fontStyle: 'italic', marginBottom: '32px' }}>
    Capturer l&apos;essence des actions de l&apos;Entraide Nationale pour une diffusion inspirante sur les réseaux sociaux!
</h3>

                <p className="text-lg text-center text-gray-700 mb-16 mt-4">
                    Notre application a pour objectif de collecter les articles sur les activités menées par les délégations de l&apos;entraide nationale sur le territoire national. 
                    Ces articles seront ensuite validés par notre service de communication avant d&apos;être publiés sur les réseaux sociaux de l&apos;entraide.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <img src="siteweb.png" alt="Application Screenshot" className="w-full h-64"  />
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <img src="ffccbb.png" alt="Application Screenshot" className="w-full h-64 object-cover"  />
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <img src="instagram.png" alt="Application Screenshot" className="w-full h-64 object-cover"  />
                    </div>
                </div>
            </div>
                {/*  <div>
                          <Beneficiaires/>
                     
                        <Etablissements />
                        
              </div>*/}
              
             {/* <div className="mt-4 flex flex-row">
                  <div className="w-1/2 mr-4" style={{ marginTop: '75px' }}>
                      <h1>Répartition des partenariats par domaine</h1>
                      <PartnershipsPieChart partnershipData={partnershipData} />
                  </div>
                  <div className="w-1/2" style={{ marginTop: '60px' }}>
                      <h1 className="mt-4">Nombre de partenariats par délégations</h1>
                      <PartnershipsChart data={partnershipsData} />
                  </div>
  </div>*/}
          </div>
         { <Footer/>}
      </div>
  );
};
export default Page;