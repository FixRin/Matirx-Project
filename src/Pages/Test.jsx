import React, { useEffect } from 'react'
import supabase from '../Utils/Supabase';
import { useSelector } from 'react-redux';

const Test = () => {
  const theme = useSelector((state) => state.theme.mode);
  const some =async() =>{
    const { data, error } = await supabase
    .from('profiles')
    .select('*');
console.log(data)
  }
  useEffect(()=>{
    some()
  },[theme])
  return (
    <div>Test</div>
  )
}

export default Test