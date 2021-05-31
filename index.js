const url = "https://pure-hamlet-36202.herokuapp.com/api/donors";

const checkCurrency = (currency, amount) => {
    if(currency === "btc") return convertToBtc(amount);
    else if(currency === "eur") return convertToEuro(amount);
    else return amount;
}

const getProjectedDonation = (frequency, amount) => {
    if(frequency === "yearly") return (amount * 12).toFixed(2);
    return Number.parseFloat(amount).toFixed(2);
}

const convertToBtc = (amt) => amt / 58065.40;

const convertToEuro = (amt) => amt / 1.19;

(function() {
    const donorData = JSON.parse(localStorage.getItem("donor"));
    console.log(window.location.pathname)
        if(donorData) {
            const currency = donorData.preferredFormOfPayment;
            const amount = checkCurrency(currency, donorData.amount);
            const projectedAmount = getProjectedDonation(donorData.frequency, donorData.amount);
            const projectedAmountInDollars = getProjectedDonation(donorData.frequency, amount);
            if(window.location.pathname.includes("/confirmation.html")) {
                document.getElementById("confirmation-body").innerHTML=`<div class="summary">
                        <div class="field">
                            <h3 class="label">First Name</h3>
                            <p class="value">${donorData.firstName}</p>
                        </div>
                        <div class="field">
                            <h3 class="label">Last Name</h3>
                            <p class="value">${donorData.lastName}</p>
                        </div>
                        <div class="field">
                            <h3 class="label">Street Address</h3>
                            <p class="value">${donorData.address}</p>
                        </div>
                        <div class="field">
                            <h3 class="label">City</h3>
                            <p class="value">${donorData.city}</p>
                        </div>
                        <div class="field">
                            <h3 class="label">Country</h3>
                            <p class="value">${donorData.country}</p>
                        </div>
                        <div class="field">
                            <h3 class="label">Postal code</h3>
                            <p class="value">${donorData.postalCode}</p>
                        </div>
                        <div class="field">
                            <h3 class="label">Phone number</h3>
                            <p class="value">${donorData.phone}</p>
                        </div>
                        <div class="field">
                            <h3 class="label">Email</h3>
                            <p class="value">${donorData.email}</p>
                        </div>
                        <div class="field">
                            <h3 class="label">Preferred form of contact</h3>
                            <p class="value">${donorData.preferredFormOfContact}</p>
                        </div>
                        <div class="field">
                            <h3 class="label">Amount</h3>
                            <p class="value">${parseFloat(donorData.amount).toFixed(2)}</p>
                        </div>
                        <div class="field">
                            <h3 class="label">Preferred form of payment</h3>
                            <p class="value">${donorData.preferredFormOfPayment.toUpperCase()}</p>
                        </div>
                        <div class="field">
                            <h3 class="label">Frequency of donation</h3>
                            <p class="value">${donorData.frequency}</p>
                        </div>
                        ${donorData.comments && `<div class="field">
                            <h3 class="label">Comments</h3>
                            <p class="value">${donorData.comments}</p>
                        </div>`}
                        <div class="field">
                            <h3 class="label">Total projected donation for a year (${currency.toUpperCase()})</h3>
                            <p class="value">${projectedAmount}</p>
                        </div>
                        ${currency === "usd" ? "" : `<div class="field">
                            <h3 class="label">Total projected donation for a year($)</h3>
                            <p class="value">${projectedAmountInDollars}</p>
                        </div>`}
                        <div class="update-link">
                            <a href="donor-form.html">Update details</a>
                        </div>
                    </div>`
            }   else if(document.getElementById("donor-form")){
                    const formInputs = document.getElementById("donor-form").elements;
                    for(let key in donorData) {
                        formInputs[key].value = donorData[key];
                    }
            }
    }
})();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const donor = {};

        const formData = new FormData(e.target);

        for (var key of formData.keys()) {
            donor[key] = formData.get(key);
        }

        //API Call
        fetch(url, {
            headers: {"Content-Type": "application/json"},
            mode: "no-cors",
            method: "POST",
            body: JSON.stringify(donor)
        })
        .then(res => {
                res.json();
                localStorage.setItem("donor", JSON.stringify(donor));
                window.location.replace("confirmation.html");
            })
        .catch(err => alert(err));
    } catch (error) {
        alert(error);
        throw new Error(error);
    }
}

const confirmDonation = () => {
    localStorage.removeItem("donor");
    window.location.replace("donation-confirmed.html");
}

const cancelDonation = () => {
    localStorage.removeItem("donor");
    window.location.replace("appreciation.html");
}
