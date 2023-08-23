import React,{useEffect} from "react";
import {useHistory,Redirect} from "react-router-dom";
import './App.css';


const Transaction = () => {
    // getting the sender's name from sign in page
        const history = useHistory();
        const sender = history.location.state.username;
        // console.log(sender);

        const [receiver, setReceiver] = React.useState('');
        const [amount, setAmount] = React.useState(0.0);
        const [note, setNote] = React.useState('');
        const [result, setResult] = React.useState('');
        //const [transactions,setTransactions] = React.useState([]);

        const handleTransaction = () => {
            const body = {
                sender : sender,
                receiver : receiver,
                amount : amount,
                note : note,
            };
            const paymentSettings = {
                method: 'post',
                body: JSON.stringify(body),
            };
            fetch('/api/make-payment', paymentSettings)
            .then (res => res.json())
            .then(data => {
                console.log(data);
                if(data.isSuccess) {
                    setResult(true);
                }else {
                    setResult(data.error);
                }
            })
            .catch(console.log);
        };

        if(result === true) {
            return (
                <div> Payment successful</div>
            )
        }

 
      

        


    return(
    <body>
        <div class ="receiver">
        <div class = "signIn-box">
        <div>
                <div className = "signIn-textfield">
                    Send To
                    <div>
                        <input type= "text" value = {receiver} onChange={(e) => setReceiver(e.target.value)}></input>
                    </div>
                </div>
                <div div className = "signIn-textfield">
                Amount
                <div class="input-field">
                <input type="number" min="0" value = {amount} onChange={(e) => setAmount(e.target.value)}></input>
                </div>
            </div>
            <div div className = "signIn-textfield">
                    Note
                    <div>
                        <input type="text" value = {note} onChange={(e) => setNote(e.target.value)}></input>
                    </div>
            </div>
        </div>
        </div>
        <div class ="card-info"></div>
        <div class="signIn-box">
            Card Information
            <div>
                <div>
                    Card Name
                    <div>
                        <input type="text"></input>
                    </div>
                </div>
                <div>
                    CVV
                    <div class="input-field">
                        <input type="number" min="0" max="9999"></input>
                    </div>
                </div>
            </div>
        <div>
            <div class="card-number">
                Card Number
                <div class="input-field">
                <input type="number" min="0"></input>
                </div>
            </div>
        </div>
        <div>
            Expiration
            <div class="selection">
                <div class="date">
                    <select name="months" id="months">
                        <option value="Jan">Jan</option>
                        <option value="Feb">Feb</option>
                        <option value="Mar">Mar</option>
                        <option value="Apr">Apr</option>
                        <option value="May">May</option>
                        <option value="Jun">Jun</option>
                        <option value="Jul">Jul</option>
                        <option value="Aug">Aug</option>
                        <option value="Sep">Sep</option>
                        <option value="Oct">Oct</option>
                        <option value="Nov">Nov</option>
                        <option value="Dec">Dec</option>
                    </select>
                        <select name="years" id="years">
                        <option value="2024">2024</option>  
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                    </select>
                </div>
            </div>    
        </div>
            <br/>
            <div className="signIn-button">        
                <button id="TransactionConfirm" onClick = {handleTransaction}>Confirm</button>
            </div>
     </div>

     <div>
      
     </div>
     
     
     </div>
    </body>
    );
};

export default Transaction;