import { JsonDB, Config } from 'node-json-db';


export const getLogs = async (req,res) => {
    const { page = 1, limit = 20, level, resourceId, searchValue, since, until } = req.query;
    const db = new JsonDB(new Config("myDatabase", true, false, '/'));

    let logs = await db.getData("/");

    logs = logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
   
    if(level){
        logs = logs.filter(({ level: resultLevel })=>level === resultLevel)
    }

    if(resourceId){
         logs = logs.filter(({ resourceId: resultResourceId })=>resourceId === resultResourceId)
    }
  
    if(searchValue){
        console.log(searchValue,logs.length)
        logs = logs.filter(({ message })=>message.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1)
        console.log(searchValue,logs.length)
    }

    if (since || until) {
        const startDate = since ? new Date(since) : null;
        const endDate = until ? new Date(until) : null;
        logs = logs.filter(l => {
        const logDate = new Date(l.timestamp);
        return (!startDate || logDate >= startDate) &&
                (!endDate || logDate <= endDate);
        });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = Number(startIndex) + Number(limit);
    logs = logs.slice(startIndex, endIndex);

    try{
        res.status(200).json({
            message: "Logs fetched successfully",
            result: {
                total: logs.length,
                logs
            }
        });
    }catch (error) {
        console.error("Error fetching logs:", error);
        return res.status(500).json({
            message: "Error fetching logs",
            error: error.message
        });
    }
  
}

export const addLogs = async (log) => {
  // Function to add logs
  // This is a placeholder function, implement the logic as needed
  res.status(200).json({
        message: "Logs added successfully",
        result: [] // This should be replaced with actual log data
    });
}