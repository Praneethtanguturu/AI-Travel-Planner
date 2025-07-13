import React,{ useState, useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import Input from '../components/ui/input.jsx';
import { AI_PROMPT, SelectBudgetOptions,SelectTravelList } from "@/constants/options"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { chatSession } from "@/service/AIModal"

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData,setFormData]=useState({});
  const [openDialog,setOpenDialog]=useState(false);
  const [loading,setLoading]=useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY
  
  const handleInputChange=(name,value)=>{
    setFormData({...formData, [name]:value })
  }

  useEffect(()=>{ 
      console.log(formData)
    },[formData])
  
  const OnGenerateTrip = async()=>{
      const user = localStorage.getItem('user')
      if(!user){
        setOpenDialog(true)
        return ;
      }
      if(formData?.totalDays>5 || !formData?.location || !formData?.budget || !formData?.traveler){
        toast("Please fill all details!")
        return ;
      }
      toast("Form generated.");
      setLoading(true);
      const FINAL_PROMPT=AI_PROMPT
      .replace('{location}',formData?.location)
      .replace('{totalDays}',formData?.totalDays)
      .replace('{traveler}',formData?.traveler)
      .replace('{budget}',formData?.budget)
  
      const result=await chatSession.sendMessage(FINAL_PROMPT);
      // console.log("--",result?.response?.text());
      setLoading(false);
      SaveAiTrip(result?.response?.text());
    } 

    const SaveAiTrip=async(TripData) => {
        setLoading(true);
        const user=JSON.parse(localStorage.getItem("user"));
        const docId=Date.now().toString();
        await setDoc(doc(db, "AiTrips", docId), {
          userSelection:formData,
          tripData:JSON.parse(TripData),
          userEmail:user?.email,
          id:docId
        });
        setLoading(false);
        navigate('/view-trip/'+docId);
    }

  return (
    <div className="px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72">
      <br></br>
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🌍✈️🌴</h2>
      <p className="mt-3 text-gray-600 text-xl">
        Just provide some basic info and we’ll generate a personalized trip.
      </p>

      <div className="mt-10 flex flex-col gap-1">
        <label className="text-xl font-medium block mb-2"> what is Destination of choice? </label>
        <GooglePlacesAutocomplete
          apiKey={apiKey}
          selectProps={{ place, onChange:(v)=>{console.log("Selected location:", v); setPlace(v); handleInputChange('location',v)}}}
        />
      </div>
      <br></br>

      <div>
        <label className="text-xl font-medium block mb-2"> How many days are your planning? </label>
        <Input placeholder={'Ex.3'} type="number" onChange={(e)=>handleInputChange('noOfDays',e.target.value)} />
      </div>
      <br></br>

      <div>
        <label className="text-xl my-3 font-medium">What is Your Budget?</label>
          <p>The budget is exclusively allocated for activities and dining purposes. </p>
            <div className="grid grid-cols-3 gap-5 mt-5 mb-5">
              {SelectBudgetOptions.map((item,index)=>(
                <div key={index} onClick={()=>handleInputChange('budget',item.title)} className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg ${formData?.budget===item.title&&'shadow-lg border-cyan-500'}`}>
                      <h2 className="text-3xl">{item.icon}</h2>
                      <h2 className="font-bold text-lg">{item.title}</h2>
                      <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
            <br></br>
      
        <label className="text-xl font-medium my-3"> Who do you plan on traveling with on your next adventure?</label>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map(( item,index)=>(
              <div key={index} onClick={()=>handleInputChange('traveler',item.people)} className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg ${formData?.traveler===item.people&&'shadow-lg border-cyan-500'}`}>
                    <h2 className="text-3xl">{item.icon}</h2> 
                    <h2 className="text-lg font-bold">{item.title}</h2> 
                    <h2 className="text-sm text-gray-500">{item.desc}</h2> 
              </div>
            ))}
          </div>
      </div>


      <div className="my-10 flex justify-end">
        <Button> Generate trip </Button>
      </div>

    </div>
  )
}

export default CreateTrip
