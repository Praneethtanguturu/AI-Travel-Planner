import React,{ useState, useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import Input from '../components/ui/input.jsx';
import { AI_PROMPT, SelectBudgetOptions,SelectTravelList } from "@/constants/options"
import { Button } from "@/components/ui/button"

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData,setFormData]=useState({});
  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY
  
  const handleInputChange=(name,value)=>{
    setFormData({...formData, [name]:value })
  }

  useEffect(()=>{ 
      console.log(formData)
    },[formData])
  

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
