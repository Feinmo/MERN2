
import './App.css'
//  the key is  - d7b0a1249bc975101cfd6b468b200e27
function App() {
 
  const fetchImg = async () => {
    console.log("Fetching Data");
    const response = await fetch(
      `adress`
    ); 
     
    const responseToJson = await response.json();
    return {
      ...responseToJson,
    };
  };

  return (
    <>
      
        
    </>
  )
}

export default App
