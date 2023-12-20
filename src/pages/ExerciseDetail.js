import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import Detail from '../components/Detail'
import ExercisesVideos from '../components/ExercisesVideos'
import SimilarExercises from '../components/SimilarExercises'


import { exerciseOptions, fetchData, youtubeoptions } from '../utils/fetchData' 
import { Details } from '@mui/icons-material'

const ExerciseDetail = () => {  

  const [ exerciseDetail, setExerciseDetail ] = useState({})
  const [ exerciseVideos, setExerciseVideos ] = useState([])
  const [ targetMuscleExercises, setTargetMuscleExercises ] = useState([]);
  const [ equipmentExercises, setEquipmentExercises ] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com' 

      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions) 
      setExerciseDetail(exerciseDetailData)

      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, 
      youtubeoptions)
      
      setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleExercisesData = await 
      fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
      setTargetMuscleExercises(targetMuscleExercisesData);

      
      const equipmentExercisesData = await 
      fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
      setEquipmentExercises(equipmentExercisesData);

    }

    fetchExercisesData(); 
  }, [id])

  return (
    <Box>
      <Detail exerciseDetail = { exerciseDetail }/>  
      <ExercisesVideos exerciseVideos = {exerciseVideos} name={exerciseDetail.name}/>  
      <SimilarExercises
       targetMuscleExercises = {targetMuscleExercises}
       equipmentExercises = {equipmentExercises}
      />  
    </Box>
  )
}

export default ExerciseDetail   
