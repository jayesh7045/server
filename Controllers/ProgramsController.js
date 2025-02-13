import { programs } from "../Models/program.model.js";
export const getProgramsData=async (req, res)=>{
  const data = await programs.find();
  console.log("get_Programs")
  if(data)
  {
    res.status(201).json({
        message : "Data sent Successfully !",
        data,
        success : true
    })
  }
  else{
    res.status(201).json({
        message : "No Data Available !",
        data : null,
        success : false
    })
  }

}