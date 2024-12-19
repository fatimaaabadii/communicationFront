"use client";
import { DataTable } from "/src/components/table/table";
import dynamic from 'next/dynamic';
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import  { useEffect } from 'react';
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState ,useRef, useMemo} from "react";
//import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Modal from "react-modal";
import { ToastAction } from "/src/components/ui/toast"
//import JoditEditor from 'jodit-react';
import { useToast } from "/src/components/ui/use-toast"
import { useQuery } from "@tanstack/react-query";
import Dropdown from "/src/components/dropdown";
import { Button } from "/src/components/ui/button";
import { api, getDelegations,  getCurrentUser,getArticles, getPresences, getPartenaires } from "/src/api";
import { QueryClient, QueryClientProvider } from 'react-query';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import React from 'react';



import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';




//const Modal = dynamic(() => import('react-modal'), { ssr: false });
//const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "/src/components/ui/dropdown-menu";
import { Switch } from "/src/components/ui/switch";

const Page = () => {
  const customStyless = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      padding: "0",
      width: "fit-content",
      maxHeight: "80vh", // Limite la hauteur de la modal à 80% de la hauteur de la vue
      overflowY: "auto", // Ajoute une barre de défilement verticale si la modal dépasse la hauteur de la vue
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modelDeleteIsOpen, setModelDeleteIsOpen] = useState(false);
  const [modelAttachmentIsOpen, setModelAttachmentIsOpen] = useState(false);
  const [value, setValue] = useState();
  //const Editor = React.lazy(() => import("react-draft-wysiwyg"));

  
  const { data: refetchh,} = useQuery({
    queryKey: ['delegations'],
    queryFn: getDelegations(),
  });
 
  

  const { data: articles,refetch} = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles(),
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptionss, setSelectedOptionss] = useState([]);
  const [comboBoxOpen, setComboBoxOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [typeOfSubmit, settypeOfSubmit] = useState("create");
  const token = getCookie('token'); 
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const [selectedValue, setselectedValue] = useState({
    delegations: [],
  attachments:[],
  content: "" });
    // Initialisez la liste des parten
  const handleCheckboxChangehandicap = (event, value) => {
    const isChecked = event.target.checked;
    
    // Récupérer une copie de selectedValue
    const updatedSelectedValue = { ...selectedValue };
    
    // Déterminer si nous sommes dans le cas d'ajout ou de modification
    const isAdding = !selectedValue.handicap;
    const isStringhandicap = typeof selectedValue.handicap === 'string';
    
    // Récupérer une copie de domaine
    let updatedhandicap = [];
    
    if (isAdding || !isStringhandicap) {
      // Ajout : domaine n'est pas encore initialisé ou est un tableau
      updatedhandicap = isAdding ? [] : [...selectedValue.handicap];
    } else {
      // Modification : domaine est une chaîne de caractères
      const trimmedhandicap = selectedValue.handicap.trim();
      
      if (trimmedhandicap !== '') {
        // Supprimer les crochets `[ ]` et les guillemets `" "`
        updatedhandicap = trimmedhandicap.replace(/[\[\]"]/g, '').split(',');
      }
    }
    
    // Modifier en fonction de la case à cocher
    if (isChecked) {
      // Ajouter la valeur au domaine
      updatedhandicap.push(value);
    } else {
      // Supprimer la valeur du domaine si elle est cochée
      updatedhandicap = updatedhandicap.filter(handicap => handicap.trim() !== value.trim());
    }
  
    // Mettre à jour les domaines déjà présents dans selectedValue
    if (selectedValue.handicap && Array.isArray(selectedValue.handicap)) {
      const existinghandicaps = selectedValue.handicap.filter(handicap => !updatedhandicap.includes(handicap));
      updatedhandicap = updatedhandicap.concat(existinghandicaps);
    }
  
    // Mettre à jour selectedValue avec la nouvelle valeur de domaine
    updatedSelectedValue.handicap = updatedhandicap.length > 0 ? updatedhandicap.join(',') : null;
    
    // Mettre à jour l'état
    setselectedValue(updatedSelectedValue);
    //console.log(updatedSelectedValue.domaine);
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }]
    ]
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font"
  ];

  const [code, setCode] = useState("hellllo");
  
  const handleProcedureContentChange = (content, delta, source, editor) => {
    setCode(content);
    //let has_attribues = delta.ops[1].attributes || "";
    //console.log(has_attribues);
    //const cursorPosition = e.quill.getSelection().index;
    // this.quill.insertText(cursorPosition, "?");
    //this.quill.setSelection(cursorPosition + 1);
  };
  const celebrationOptions = ["عرض، ندوة، مداخلة، مائدة مستديرة", "لقاء تحسيسي", "يوم تواصلي", "عرض شريط", "تدشين", "توقيع اتفاقية شراكة", "تكريم", "حفل فني", "مهرجان خطابي", "عرض تاريخي", "درس ديني", "حفل شاي", "عرض مسرحي", "ورشة أو دورة تكوينية", "توزيع هدايا", "توزيع دبلومات", "توزيع مساعدات", "معارض", "ورشات تربوية", "زيارات ميدانية", "الأبواب المفتوحة", "أنشطة موازية (نشاط بيئي، حملات طبية، عروض أزياء، خرجات ترفيهية، ورشات دينية....)", "آخر"

  ];

  const [celebrationDetails, setCelebrationDetails] = useState(
    selectedValue.celebrationDetails || []
  );
  useEffect(() => {
    if (selectedValue && selectedValue.celebrationDetails) {
      setCelebrationDetails(selectedValue.celebrationDetails);
    }
  }, [selectedValue]);
  const handleCheckboxChange = (type, isChecked) => {
    const updatedDetails = isChecked
      ? [...celebrationDetails, { celebrationType: type, count: 1 }]
      : celebrationDetails.filter((detail) => detail.celebrationType !== type);

    setCelebrationDetails(updatedDetails);
    setselectedValue((prev) => ({
      ...prev,
      celebrationDetails: updatedDetails,
    }));
  };

  const handleCountChange = (type, value) => {
    const updatedDetails = celebrationDetails.map((detail) =>
      detail.celebrationType === type
        ? { ...detail, count: parseInt(value, 10) || 0 }
        : detail
    );

    setCelebrationDetails(updatedDetails);
    setselectedValue((prev) => ({
      ...prev,
      celebrationDetails: updatedDetails,
    }));
  };








  const handleParticipantChange = (type, value) => {
    const updatedDetails = celebrationDetails.map((detail) =>
      detail.celebrationType === type
        ? { ...detail, nbrePresence: parseInt(value, 10) || 0 }
        : detail
    );

    setCelebrationDetails(updatedDetails);
    setselectedValue((prev) => ({
      ...prev,
      celebrationDetails: updatedDetails,
    }));
  };
  
 //console.log(refetchh);
 function stripHtmlTags(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}
  const delegationColumns = [
    {
      id: 'id',
      header: 'id',
      accessorKey: 'id',
      enableSorting: true,
      sortDescFirst: true,
    },
    {
      accessorKey: "title",
      id: "Titre",
      header: () => (
        <div className="text-left">Titre</div>
      ),
      cell: ({ row }) => (
        <div className="capitalize rtl:text-left">{row.original.title}</div>
      ),
    }
    ,
    {
      accessorKey: "content",
      header: () => (
        <div className="text-left">Contenu de l&apos;article</div>
      ),
      cell: ({ row }) => (
        <div className="rtl:text-left">{stripHtmlTags(row.getValue("content"))}</div>
      ),
    }
    ,
    
    {
      id: 'Type d\'activité',
      accessorKey: 'typeEvenet',
      header: () => (
        <div className="text-left">Type d&apos;activité</div>
      ),
      cell: ({ row }) => {
        return (
          <div className=" rtl:text-left">
            {row.original.typeEvenet}
          </div>
        );
      },
    }
    ,
    
    
    {
      accessorKey: "dateSoumission",
      id: 'dateSoumission',
      header: () => (
        <div className="text-left">Date de Soumission</div>
      ),
      cell: ({ row }) => (
        <div className="capitalize rtl:text-left">{row.original.dateSoumission}</div>
      ),
    }
    ,
    {
      accessorKey: "dateEvent",
      header: () => (
        <div className="text-left">Date de l&apos;événement</div>
      ),
      cell: ({ row }) => (
        <div className="capitalize rtl:text-left">{row.getValue("dateEvent")}</div>
      ),
    }
    ,
  
    {
      id: 'Délégations',
      header: () => (
        <div className="text-left">Délégation</div>
      ),
      accessorFn: (row) => row.delegations[0]?.delegation,
      cell: ({ row }) => (
        <div className="capitalize rtl:text-left">
          {row.original.delegations[0]?.delegation || 'Aucune délégation'}
        </div>
      ),
      filterFn: (row, columnId, filterValue) => {
        const delegation = row.getValue(columnId);
        return delegation?.toLowerCase().includes(filterValue.toLowerCase());
      },
    }
    ,
   {
  accessorKey: "etat",
  header: () => (
    <div className="text-left">Etat</div>
  ),
  cell: ({ row }) => {
    const etat = row.getValue("etat");
    let couleur;
    let affichage;

    const ETATS = {
      TRAITEMENT: "En cours de traitement",
      VALIDATION: "En cours de validation",
      VALIDE: "Validé",
      NON_VALIDE: "Non validé"
    };

    switch (etat) {
      case ETATS.TRAITEMENT:
        couleur = "bg-orange-100 text-orange-800";
        affichage = ETATS.TRAITEMENT;
        break;
      case ETATS.VALIDATION:
        couleur = "bg-blue-100 text-blue-800";
        affichage = ETATS.VALIDATION;
        break;
      case ETATS.VALIDE:
        couleur = "bg-green-100 text-green-800";
        affichage = ETATS.VALIDE;
        break;
      case ETATS.NON_VALIDE:
        couleur = "bg-blue-100 text-blue-800"; 
        affichage = ETATS.VALIDATION; 
        break;
      default:
        couleur = "bg-gray-100 text-gray-800";
        affichage = "Inconnu";
        break;
    }

    return <div className={`rtl:text-left ${couleur} p-2 rounded-md w-full h-full`}>{affichage}</div>;
  },
}
    ,
 {
  accessorKey: "observation",
  header: () => (
    <div className="text-left">Observation</div>
  ),
  cell: ({ row }) => {
    const observation = row.getValue("observation");

    return (
      <div className="rtl:text-left">
        {observation || "Pas d'observations pour le moment"}
      </div>
    );
  },
},    
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => {
                  //get selected row data
                  setselectedValue(row.original);
                  const partenaireId = row.original.id; // Récupération de l'ID de l'employé
   
    
    
    
                  


                  setIsOpen(true);
                  settypeOfSubmit("update");
                  
                }}
              >
                Mettre à jour cette ligne
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setselectedValue(row.original);
                 // console.log(selectedValue.id);
                  setModelDeleteIsOpen(true);
                }}
              >
                Supprimer cette ligne
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setselectedValue(row.original);
                 // console.log(selectedValue.id);
                  setModelAttachmentIsOpen(true);
                }}
              >
                Joindre des fichiers
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const { toast } = useToast()

  //use query to get data from the server
 
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser(),
  });
  function openModal() {
    setIsOpen(true);
  }
  const { data: presences,} = useQuery({
    queryKey: ['presences'],
    queryFn: getPresences(),
  });

  const { data: partenaires,} = useQuery({
    queryKey: ['partenaires'],
    queryFn: getPartenaires(),
  });
  const options5 = (Array.isArray(presences) ? presences : []).map(asso => ({
    value: asso.id,
    label: asso.name, // Assurez-vous que vous avez un champ `serviceName` ou remplacez-le par le champ approprié
  }));
  const options6 = (Array.isArray(partenaires) ? partenaires : []).map(asso => ({
    value: asso.id,
    label: asso.name, // Assurez-vous que vous avez un champ `serviceName` ou remplacez-le par le champ approprié
  }));
  const handleSelectChangeService = (selectedOptions) => {
    // selectedOptions sera un tableau d'objets
    const selectedServices = selectedOptions.map(option => ({
      id: option.value,
      label: option.label
    }),
  
       setselectedValue(prevState => ({
    ...prevState,
    presences: selectedServices ? selectedServices : ''
  })));
    
    // Mettre à jour l'état ou effectuer d'autres actions avec selectedServices
  };



  const handleSelectChangepartenaires = (selectedOptions) => {
    // selectedOptions sera un tableau d'objets
    const selectedServices = selectedOptions.map(option => ({
      id: option.value,
      label: option.label
    }),
  
       setselectedValue(prevState => ({
    ...prevState,
    partenaires: selectedServices ? selectedServices : ''
  })));
    
    // Mettre à jour l'état ou effectuer d'autres actions avec selectedServices
  };

  //const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([])
  
  // Gérer la sélection de fichier
  const formData = new FormData();
  const attachments = new FormData();
  /*const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Obtenir le fichier sélectionné à partir de l'événement
  
  // Mettre à jour l'état local du fichier
        setFile(selectedFile);
         
  // Ajouter le fichier sélectionné à l'objet FormData
        formData.append('file', selectedFile);
    
   
  };*/
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files; // Get the selected files from the event

    // Update the local state with the selected files
    setFiles(Array.from(selectedFiles));
  };
 
 
  useEffect(() => {
    if (selectedValue && selectedValue.delegations && selectedValue.delegations.length > 0) {
      setSelectedOptions(selectedValue.delegations.map(delegation => ({
        value: delegation.id.toString(),
        label: delegation.delegation,
      })));
    }
  }, [selectedValue]);

 /* useEffect(() => {
    if (selectedValue && selectedValue.etablissement) {
      setSelectedOptionss([
        {
          value: selectedValue.etablissement,
          label: selectedValue.etablissement,
        }
      ]);
    }
  }, [selectedValue]);*/
  const handleSelect = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    console.log([parseFloat(selectedOptions.value)]);
    // Autres manipulations si nécessaire
  };
  
  
  
  //console.log(articles);
  function closeModal() {
    setIsOpen(false);
  }


  const [localDate, setLocalDate] = useState('');

  useEffect(() => {
    // Obtenir la date actuelle
    const currentDate = new Date();

    // Obtenir les composants de la date
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    // Format de la date locale (par exemple : YYYY-MM-DD)
    const localDateString = `${day}/${month}/${year}`;

    // Mettre à jour l'état avec la date locale
    setLocalDate(localDateString);
  }, []);
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    // Filtrer les données en fonction du rôle de l'utilisateur lorsqu'il change
    const filtered = filterDataByRole(articles || [], userData);
    setFilteredData(filtered);
  }, [articles, userData]);

  //console.log("mydata", filteredData);
  const filterDataByRole = (articles, userData) => {
    if (userData?.roles === "DELEGUE_ROLES" || userData?.roles === "COORDINATEUR_ROLES") {
      // Filtrer les données où la colonne "delegations" contient une délégation égale à "user.delegation"
      return articles.filter(article =>
        article.delegations.some(delegation => delegation.delegation.trim() === userData.delegation.trim())
      );
    } else {
      // Si le rôle de l'utilisateur n'est pas défini, retourner toutes les données
      return articles;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeOfSubmit === "create") {
      files.forEach((file, index) => {
        
        formData.append('files', file);
        attachments.append('files', file);
      });
      try {
        const parsedSelectedValue = {
          ...selectedValue,
          title: selectedValue.title,
        // idDelegations: [parseFloat(selectedOptions.value)],
         idDelegations: [parseFloat(refetchh.find(delegation => delegation.delegation === userData.delegation)?.id)],
         observation:"Pas d'observations pour le moment",
         content: selectedValue.content,
         dateSoumission: localDate,
         id: parseFloat(selectedValue.id),
         typeEvenet:selectedValue.typeEvenet,
         dateEvent:selectedValue.dateEvent,
         corrige: "Pas de correction",
         sousType:selectedValue.sousType,
         etat:"En cours de traitement", // Si som est un nombre à virgule flottante
         //idDelegations: [selectedValue.delegations],
         //attachments: [formData]        
         presences: selectedValue.presences || [], // Ajout des présences s'il y en a
         partenaires: selectedValue.partenaires || [], // Ajout des partenaires s'il y en a
         celebrationDetails: selectedValue.celebrationDetails || [] 
          
        };
        //formData.append('article', parsedSelectedValue);
       console.log('Données envoyées au serveur:', {request:parsedSelectedValue, attachments :formData}); 
     const response = await api.post("/article/create",parsedSelectedValue, 
        {headers: {
          ...headers,
   
      }
              }
         
       )
        openModal()
        refetch()
        toast({
          description: "Article créé avec succès",
          className: "bg-green-500 text-white",
          duration: 2000,
          title: "Success",
        })
        setIsOpen(false);
        window.location.reload()

      } catch (e) {
        toast({
          description: "Erreur lors de la création d'un nouveau article",
          className: "bg-red-500 text-white",
          duration: 2000,
          title: "Error",
        })
      }
    
        
    
    }
    else if (typeOfSubmit === "update" ) {
      try {
        const parsedSelectedValue = {
          ...selectedValue,
          /*delegation: userData.delegation,
         // idDelegations:  userData?.roles === "DELEGUE_ROLES"  ? [idDelegation]: selectedOptions.map(option => parseInt(option.value)),
          nom: selectedValue.nom,
          etablissement: selectedOptionss.label || selectedValue.etablissement,
          id: parseFloat(selectedValue.id), // Si som est un nombre à virgule flottante
          etat: selectedValue.etat,
          idDelegations: [parseFloat(refetchh.find(delegation => delegation.delegation === userData.delegation)?.id)],
          coordination: userData.coordination,
          sexe: selectedValue.sexe,
          handicap: selectedValue.handicap,
          email: selectedValue.email,*/
          title: selectedValue.title,
          // idDelegations:  userData?.roles === "DELEGUE_ROLES"  ? [idDelegation]: selectedOptions.map(option => parseInt(option.value)),
          content: selectedValue.content,
          dateSoumission: selectedValue.dateSoumission,
          id: parseFloat(selectedValue.id), // Si som est un nombre à virgule flottante
        //  idDelegations: [parseFloat(selectedOptions.value)],
          idDelegations: [parseFloat(refetchh.find(delegation => delegation.delegation === userData.delegation)?.id)],
          attachments: selectedValue.attachments,
          corrige: "Pas de correction",
          etat: selectedValue.etat,
          observation:selectedValue.observation,
          typeEvenet:selectedValue.typeEvenet,
          sousType:selectedValue.sousType,
          dateEvent:selectedValue.dateEvent,
          presences: selectedValue.presences || [], // Ajout des présences s'il y en a
          partenaires: selectedValue.partenaires || [], // Ajout des partenaires s'il y en a
          celebrationDetails: selectedValue.celebrationDetails || [] 
        };
        
        console.log('Données envoyées au serveur:', parsedSelectedValue);
       // console.log(selectedValue);
        const response = await api.put("/article/update/"+ selectedValue.id, 
        parsedSelectedValue, {
            headers: headers
                 
                })
          
        
        refetch()
        toast({
          description: "Article mis à jour avec succès",
          className: "bg-green-500 text-white",
          duration: 2000,
          title: "Success",
        })
        setIsOpen(false);
      } catch (e) {
        toast({
          description: "Erreur lors de la mise à jour de l'article",
          className: "bg-red-500 text-white",
          duration: 2000,
          title: "Error",
        })
      }
    }
  
  }
  const editor = useRef(null);
	  const [content, setContent] = useState('');

	
  return (
    
    <div className="px-10 py-4" id="Articles">
      <DeleteModal
        closeModal={() => setModelDeleteIsOpen(false)}
        modalIsOpen={modelDeleteIsOpen}
        selectedValue={selectedValue}
        refetch={refetch}
        toast={toast}
      />
      <AttachmentModal
       
       isOpen={modelAttachmentIsOpen}
       closeModal={() => setModelAttachmentIsOpen(false)}
       selectedValue={selectedValue}
       refetch={refetch}
       toast={toast}
      
       idarticle ={selectedValue.id} 
     />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyless}
        contentLabel="Example Modal"
      >
        <form className="max-w-lg mx-auto py-8 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4 px-6 text-center">
            {typeOfSubmit === "create"
              ? "Ajouter un Nouveau Article"
              : "Mise à jour de l'article actuel"}
          </h2>
          <div className="px-6 mb-4 flex flex-col w-full">
              <label className="block mb-1" htmlFor="delegation">
                    Délégation
               </label>
   
              <Select
          options={(refetchh || []).map(item => ({
            value: item.id.toString(),
            label: item.delegation,
          }))}
          value={selectedOptions}
          onChange={handleSelect}
          placeholder="Sélectionner une délégation"
          required 
             />
        </div>

          <div className=" px-6  mb-4">
            <label className="block mb-1" for="title">
            Titre de l&apos;article
            </label>
           
          <input
             className="w-full border rounded-md px-3 py-2"
             type="text"
              id="title"
             placeholder="Titre"
             value={selectedValue?.title || " "}
             required
             onChange={(e) => {
                setselectedValue({
                  ...selectedValue,
                  title: e.target.value,
                });}}
                 
             />
        
              </div>


          


          <div className="px-6 mb-4">
  <label className="block mb-1" htmlFor="content">
    Contenu de l&apos;article
  </label>
  <JoditEditor
			ref={editor}
			value={selectedValue.content || content}
			placeholder="Contenu"
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} 
      required // preferred to use only this option to update the content for performance reasons
			onChange={(newContent) => {
        if (selectedValue) {
            setselectedValue({
                ...selectedValue,
                content: newContent,
            });
        }
    }}
    
		/>
 
</div>




<div className=" px-6  mb-4">
            <label className="block mb-1" for="dateEvent">
           Date de l&apos;événement
            </label>
           
          <input
             className="w-full border rounded-md px-3 py-2"
             type="date"
            id="dateEvent"
             
             value={selectedValue?.dateEvent || " "}
             onChange={(e) => {
                setselectedValue({
                  ...selectedValue,
                  dateEvent: e.target.value,
                });}}
                required 
             />
        
              </div>











<div className="px-6 mb-4">
  <label className="block mb-1" htmlFor="typeEvenet">
    Type d&apos;activité
  </label>
  <select
    id="typeEvenet"
    className="w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
    value={selectedValue.typeEvenet || ''}
    onChange={(e) => {
      if (selectedValue) {
        setselectedValue({
          ...selectedValue,
          typeEvenet: e.target.value,
        });
      }
    }}
    required 
  >
    <option value="">Sélectionner un type d&apos;activité</option>
    <option value="Activités du Directeur">Activités du Directeur</option>
    <option value="Activités de la Ministre">Activités de la Ministre</option>
    <option value="Visites">Visites : Visites de surveillance des établissements et centres</option>
    <option value="Rencontres">Rencontres : Conférences, rencontres de sensibilisation...</option>
    <option value="Jours et fêtes nationales">Jours et fêtes nationales </option>
    <option value="Jours et fêtes internationales">Jours et fêtes internationales </option>
    <option value="Inaugurations">Inaugurations </option>
    <option value="Partenariats">Partenariats </option>
    <option value="Formations">Formations </option>
    <option value="Journées portes ouvertes">Journées portes ouvertes</option>
    <option value="Examens des centres de formation">Examens des centres de formation </option>
    <option value="Distribution des diplômes">Distribution des diplômes</option>
    <option value="Distribution des aides">Distribution des aides </option>
    <option value="Anniversaire de la création de l'Entraide Nationale">Anniversaire de la création de l&apos;Entraide Nationale</option>
    <option value="Activités parallèles">Activités parallèles </option>
    <option value="championnats">Championnat national des jeux des établissements et centres sociaux </option>
    <option value="Opération Ramadan">Participation à l&apos;opération Ramadan</option>
    <option value="Expositions">Expositions </option>
    <option value="Solidarité">Solidarité : Interventions de terrain, caravanes humanitaires,repas d&apos;Iftar dans les institutions de protection sociale. etc.</option>
  </select>
</div>










{selectedValue.typeEvenet === "Jours et fêtes internationales" && (
  <div className="px-6 mb-4">
    <label className="block mb-1" htmlFor="sousType">
    La journée ou la fête internationale concernée
    </label>
    <select
      id="sousType"
      className="w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
      value={selectedValue.sousType || ''} // Assurez-vous que sousType est défini
      onChange={(e) => {
        const newsoustype = e.target.value; // Récupérer la nouvelle valeur
        if (selectedValue) {
          setselectedValue({
            ...selectedValue,
            sousType: newsoustype,
          });
        }
      }}
      required
    >
      <option value="">Sélectionner un sous type</option>
      <option value="La Journée Mondiale de Lutte contre la Violence à l'Egard des Femmes">
        La Journée Mondiale de Lutte contre la Violence à l&apos;Egard des Femmes
      </option>
      <option value="Autre">Autre</option>
    </select>
  </div>
)}

{selectedValue.typeEvenet === "Jours et fêtes internationales" && (
<div className="px-6 mb-4 flex flex-col w-full">
  <label className="block mb-1" htmlFor="presences">
  Liste de présence
  </label>
  <Select
    id="etablissement"
    options={options5}
    value={selectedValue?.presences?.map(presence => options5.find(option => option.value === presence.id))}
    onChange={handleSelectChangeService}
    placeholder="Liste de présence"
    isMulti
    className="w-full"
    
  />
</div>
)}







{selectedValue.typeEvenet === "Jours et fêtes internationales" && (
<div className="px-6 mb-4 flex flex-col w-full">
  <label className="block mb-1" htmlFor="partenaires">
    Liste des partenaires
  </label>
  <Select
    id="partenaires"
    options={options6}
    value={selectedValue?.partenaires?.map(partenaire => options6.find(option => option.value === partenaire.id))}
    onChange={handleSelectChangepartenaires}
    placeholder="Liste des partenaires"
    isMulti
    className="w-full"
    
  />
</div>
)}

{selectedValue.typeEvenet === "Jours et fêtes internationales" && (
  <div className="px-6 mb-4">
    <label className="block mb-1" htmlFor="partenaires">
      Détails des Événements : Types et Quantités
    </label>

    {celebrationOptions.map((type) => (
      <div key={type} className="flex items-center gap-4 mb-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={type}
            className="h-4 w-4"
            onChange={(e) => handleCheckboxChange(type, e.target.checked)}
            checked={celebrationDetails.some(
              (detail) => detail.celebrationType === type
            )}
          />
          <label htmlFor={type} className="text-sm">
            {type}
          </label>
        </div>

        {celebrationDetails.some(
          (detail) => detail.celebrationType === type
        ) && (
          <div className="flex items-center gap-2">
            <span className="text-sm">Nombre :</span>
            <input
              type="number"
              min="1"
              className="w-20 px-2 py-1 border border-gray-300 rounded-lg"
              value={
                celebrationDetails.find(
                  (detail) => detail.celebrationType === type
                )?.count || ""
              }
              onChange={(e) => handleCountChange(type, e.target.value)}
              placeholder="Nombre"
            />
          </div>



        )}


{celebrationDetails.some(
          (detail) => detail.celebrationType === type
        ) && (
          <div className="flex items-center gap-2">
            <span className="text-sm">Nombre de Participants :</span>
            <input
              type="number"
              min="1"
              className="w-20 px-2 py-1 border border-gray-300 rounded-lg"
              value={
                celebrationDetails.find(
                  (detail) => detail.celebrationType === type
                )?.nbrePresence || ""
              }
              onChange={(e) => handleParticipantChange(type, e.target.value)}
              placeholder="Participants"
            />
          </div>



        )}
      </div>
    ))}
  </div>
)}

{/*<div className="px-6 mb-4">
      <label className="block mb-1" htmlFor="attachments">
        Pièces jointes
      </label>
      <input
        className="w-full border rounded-md px-3 py-2"
        type="file"
        id="attachments"
        onChange={handleFileChange}
        multiple  
      />
     
    </div>
          <div>
      <input type="file" multiple onChange={handleFileChange} />
      {/* Optionally, display the names of the selected files 
      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
   
    </div> */}
   
          <div className="mt-4 px-6 flex justify-end">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Envoyer
            </button>
          </div>
        </form>
      </Modal>
      <DataTable
        title={"Articles"}
        //filterCol="title"
        filterCols={['Titre', 'dateSoumission', 'Type d\'activité', 'Délégations']}
        columns={delegationColumns}
        data={filteredData || []}
        setOpenModal={openModal}
        settypeOfSubmit={settypeOfSubmit}
        canAdd={true}
      />
    </div>
  );
};

export default Page;

const AttachmentModal = ({ isOpen, closeModal, selectedValue, refetch, toast, idarticle }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      width: "fit-content",
    },
  };
  const [files, setFiles] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  
  const loadAttachments = async () => {
    const token = getCookie('token');
    try {
      const response = await api.get(`https://communication.entraide.ma/api/attachments/by-article/${idarticle}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const attachments = response.data;
      setAttachments(attachments);
      await loadImageUrls(attachments, token);
    } catch (error) {
      console.error('Error loading pieces jointes:', error);
    }
  };
  useEffect(() => {
    if (isOpen) {
      loadAttachments();
    }
  }, [isOpen, loadAttachments]);

  const loadImageUrls = async (attachments, token) => {
    const urls = {};
    for (const attachment of attachments) {
    //  if (attachment.fileType.startsWith('image/')) {
        const response = await fetch(`https://communication.entraide.ma/api/attachments/download/${attachment.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
         },
        }
      );
        const blob = await response.blob();
        urls[attachment.id] = URL.createObjectURL(blob);
      //}
    }
    setImageUrls(urls);
  };

  const handleDownloadClick = async (e, fileId, fileName) => {
    e.preventDefault();

    try {
      const token = getCookie('token');
      const response = await fetch(`https://communication.entraide.ma/api/attachments/download/${fileId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier :', error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles(Array.from(selectedFiles));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await api.put(`https://communication.entraide.ma/api/attachments/create/${parseFloat(idarticle)}`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        description: 'Pièces jointes ajoutées avec succès',
        className: 'bg-green-500 text-white',
        duration: 2000,
        title: 'Success',
      });

      refetch();
     // closeModal();
    } catch (error) {
      toast({
        description: 'Erreur lors de l\'ajout des pièces jointes',
        className: 'bg-red-500 text-white',
        duration: 2000,
        title: 'Error',
      });

      console.error('Error adding attachments:', error);
    }
  };

  const renderIcon = (fileType) => {
    if (fileType.startsWith('image/') ) {
      return <i className="fas fa-file-image" style={styles.fileIcon}></i>;
    }
    return <i className="fas fa-file-alt" style={styles.fileIcon}></i>;
  };
  const handleDeleteClick = async (e, fileId) => {
    e.preventDefault();

    try {
      const token = getCookie('token');
      const response = await api.delete(`https://communication.entraide.ma/api/attachments/delete/${fileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      

      // Rafraîchir les données après la suppression
      refetch();
      setAttachments(attachments.filter(attachment => attachment.id !== fileId));
      toast({
        description: 'Pièce jointe supprimée avec succès',
        className: 'bg-green-500 text-white',
        duration: 2000,
        title: 'Success',
      });
    } catch (error) {
      

      toast({
        description: 'Erreur lors de la suppression de la pièce jointe',
        className: 'bg-red-500 text-white',
        duration: 2000,
        title: 'Error',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Gestion des pièces jointes</h2>
        </div>
        
        <div className="p-6">
          <form className="mb-8" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="flex-grow p-2 border border-gray-300 rounded text-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-gray-500 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Ajouter
              </button>
            </div>
          </form>

          <h3 className="text-lg font-semibold mb-4 text-gray-700">Liste des pièces jointes</h3>
          
          <div className="mt-4 max-h-[50vh] overflow-y-auto">
            {attachments.length === 0 ? (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-700">
                <p>Aucune pièce jointe n&apos;a été ajoutée pour le moment.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {attachments.map(attachment => (
                  <li key={attachment.id} className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                      {attachment.fileType.startsWith('image/') ? (
                        <img
                          src={imageUrls[attachment.id]}
                          alt={attachment.fileName}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : attachment.fileType.startsWith('video/') ? (
                        <video className="w-12 h-12 object-cover rounded">
                          <source src={imageUrls[attachment.id]} type={attachment.fileType} />
                        </video>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <span className="font-medium text-gray-700">{attachment.fileName}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => handleDownloadClick(e, attachment.id, attachment.fileName)}
                        className="bg-blue-900 hover:bg-blue-900 text-white py-1 px-3 rounded text-sm transition duration-200"
                      >
                        Télécharger
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(e, attachment.id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm transition duration-200"
                      >
                        Supprimer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

const styles = {
  attachmentList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  attachmentItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  imagePreview: {
    maxWidth: '70px',
    maxHeight: '70px',
    marginRight: '10px',
    borderRadius: '4px',
  },
  fileIcon: {
    fontSize: '24px',
    marginRight: '10px',
  },
  fileName: {
    flexGrow: 1,
  },
  downloadLink: {
    textDecoration: 'none',
    color: '#7a7a7a',
    cursor: 'pointer',
    margin: '0 40px',
  },
  downloadLinkHover: {
    textDecoration: 'underline',
  },
  tableHeader: {
    backgroundColor: '#ccc',
    color: '#333',
    padding: '10px',
    textAlign: 'center',
  },
  space: {
    margin: '0 40px', // Ajout d'un espace de 10 pixels entre les deux liens
  },
};




const DeleteModal = ({ modalIsOpen, afterOpenModal, closeModal, selectedValue, refetch, toast }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      width: "fit-content",
    },
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getCookie('token'); 
    const headers = {
        Authorization: `Bearer ${token}`
    };
    try {
      await api.delete("/article/delete/"+selectedValue.id,{
        headers: headers
             
            } )
      toast({
        description: "Supprimé avec succès",
        className: "bg-green-500 text-white",
        duration: 2000,
        title: "Success",
      })
      refetch()
      closeModal()
    } catch (e) {
      toast({
        description: "Erreur lors de la suppression de l'article",
        className: "bg-red-500 text-white",
        duration: 2000,
        title: "Error",
      })
      console.log(e);
    }
  }



  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold mb-4">Supprimer</h2>
        <div className="mb-4">
          <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded-md">
          
            Annuler
          </button>
          <button
            type="submit"
            className="bg-gray-500 text-white px-4 py-2 rounded-md">
          
            Supprimer
          </button>
        </div>
      </form>
    </Modal>
  );



  
};


