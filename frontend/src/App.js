import logo from './logo.svg';
import './App.css';
import {Image, Button} from "@chakra-ui/react"


function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

function App() {

async function displayRazorpay () {

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

      if (!res){
        alert('Razropay failed to load!!')
        return 
      }

      const data = await fetch('http://localhost:8080/create-order', {method: 'POST'}).then((t) => 
        t.json()
      ) 

      console.log(data)

    const options = {
      "key": "", // Enter the Key ID generated from the Dashboard
      "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Acme Corp",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url":"http://localhost:1769/verify",
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  const paymentObject =await new window.Razorpay(options); 
  paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <Image src={logo} className="App-logo" alt="logo" />   
        <Button
        onClick={displayRazorpay}
        >
          Pay now 
        </Button>
      </header>
    </div>
  );
}

export default App;