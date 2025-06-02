import { useEffect, useState, useTransition } from 'react'
import axiosInstance from '../lib/axiosInstance'
import Card from '../components/ui/Card'
import { useNavigate } from 'react-router'
import { ClipLoader } from 'react-spinners'


export default function Grandmasters() {  
    const [ grandmasterList, setGrandmasterList ] = useState<string[]>([])

    // HOOKS
    const [ isPending, startTransition ] = useTransition()
    const navigate = useNavigate()
    
    // FUNCTIONS
    const fetchAllGrandmasters = () => {
        startTransition(async () => {
            await axiosInstance
              .get('/pub/titled/GM')
              .then(res => setGrandmasterList(() => res?.data?.players ?? []))
              .catch(err => console.error(err))
        })
    }

    // INITIALIZATIONS
    useEffect(() => {
        fetchAllGrandmasters()
    },[])

    if(isPending) {
        return (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ClipLoader
                    loading={isPending}
                    size={200}
                    color="yellow"
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        )
    }

    return (
        <div className='w-screen'>
            <h1 className='text-4xl text-center'>Grandmasters</h1>
            <div className='flex flex-col gap-4 mt-8 w-full md:w-[900px] mx-auto p-8'>
                {grandmasterList.map((player:string, index:number) => (
                  <Card 
                    key={index} 
                    onClick={() => navigate(`/${player}`)}
                  >
                    {player}
                  </Card>
                ))}
            </div>
        </div>
    )
}
