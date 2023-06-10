function emi(req,res,next){
    let {amount,rate,months} = req.body;
    //EMI:E = P x r x ( 1 + r )n / ( ( 1 + r )n - 1 ) 
    rate = rate/12/100;
    let emi = amount*rate*(1+rate)**months/((1+rate)**months-1);
    let totalAmount = emi*months;
    let interest = totalAmount-amount;

    console.log(emi);
    req.body.emi = emi;
    req.body.total = totalAmount;
    req.body.intrest = interest;
    next();
}
module.exports = emi;