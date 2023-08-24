//--------------------------------------------------------------------------------
//################################################################################
//--------------------------------------------------------------------------------
window.addEventListener('load', () =>
{
	//------------------------------------------------------------
	//############################################################
	//------------------------------------------------------------
	if(document.getElementById('nav_contact_us')){ document.getElementById('nav_contact_us').style.display = 'none'; } 
	if(document.getElementById('contact_form')){ document.getElementById('contact_form').style.display = 'block'; } 
	if(document.getElementById('name')){ document.getElementById('name').focus(); } 
    //------------------------------------------------------------
    if(document.getElementById('contact_form_email'))
    {
        //------------------------------------------------------------
        // let contactEmailLink = slide_base64_decode('Oy8wKj07Kl4qNTE8LC87MzI5JXA7L3ApMw==');
        let contactEmail = document.getElementById('contact_form_email').innerText.replace('webmaster_','');
        //------------------------------------------------------------
        document.getElementById('contact_form_email').innerText = contactEmail;
        //------------------------------------------------------------
    }
    //------------------------------------------------------------
    if(document.getElementById('noscript_mailto_link') && document.getElementById('noscript_mailto_link').href)
    {
        //------------------------------------------------------------
        let mailtoLink = document.getElementById('noscript_mailto_link').href.replace('webmaster_','');
        //------------------------------------------------------------
        document.getElementById('noscript_mailto_link').href = mailtoLink;
        //------------------------------------------------------------
    }
    //------------------------------------------------------------
    if(document.getElementById('noscript_email'))
    {
        //------------------------------------------------------------
        let noscriptEmail = document.getElementById('noscript_email').innerText.replace('webmaster_','');
        //------------------------------------------------------------
        document.getElementById('noscript_email').innerText = noscriptEmail;
        //------------------------------------------------------------
    }
    //------------------------------------------------------------    
    const num1 = Math.floor(Math.random() * 899) + 100;
    const num2 = Math.floor(Math.random() * 899) + 100;
	//------------------------------------------------------------
    document.getElementById('human_test_text').innerText = `${num1}    ${num2}`;
	//------------------------------------------------------------
	//############################################################
	//------------------------------------------------------------
});
//--------------------------------------------------------------------------------
function handleSubmit()
{
    //--------------------------------------------------------------------------------
    update_status();
    //--------------------------------------------------------------------------------
    let name = document.getElementById('name').value.replace(/^\s+/,'').replace(/\s+$/,'');
    let email = document.getElementById('email').value.replace(/\s*/g,'');
    let message = document.getElementById('message').value.replace(/^\s+/,'').replace(/\s+$/,'');
    let human_test = document.getElementById('human_test').value.replace(/^\s+/,'').replace(/\s+$/,'');
    //--------------------------------------------------------------------------------
    let human_test_text = document.getElementById('human_test_text').innerText.replace(/\s/g,'');
    //--------------------------------------------------------------------------------
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('message').value = message;
    document.getElementById('human_test').value = human_test;
    //--------------------------------------------------------------------------------
    document.getElementById('check_value').value = parseInt(human_test_text.substring(0, 3), 10) * parseInt(human_test_text.substring(3, 6), 10);
    //--------------------------------------------------------------------------------
    if(name===''){ update_status_error('Name cannot be blank'); document.getElementById('name').focus(); return false; }
    //----------------------------------------
    if(email===''){ update_status_error('Email Address cannot be blank'); document.getElementById('email').focus(); return false; }
    //----------------------------------------
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.\w+$/.test(email)){ update_status_error('Invalid Email Address'); document.getElementById('email').focus(); return false; }
    //----------------------------------------
    if(message===''){ update_status_error('Message cannot be blank'); document.getElementById('message').focus(); return false; }
    //----------------------------------------
    if(human_test.replace(/\s/g,'').length!==6 || human_test.replace(/\s/g,'') !== human_test_text.replace(/\s/g,'')){ update_status_error('Please enter the two numbers displayed next to the form'); document.getElementById('human_test').value = ''; document.getElementById('human_test').focus(); return false; }
    //--------------------------------------------------------------------------------
    // strip whitespace from human value input  
    document.getElementById('human_test').value = document.getElementById('human_test').value.replace(/\s/g, '');
    //--------------------------------------------------------------------------------
    // collect data before disabling inputs
    //----------
    let contactForm = document.getElementById('contact_form');
    let formData = new FormData(contactForm);
    let body = new URLSearchParams(formData).toString();
    //----------
    if(!/domain=/i.test(body)){ update_status_error('form data error: missing domain'); document.getElementById('name').focus(); return false; }
    if(!/name=/i.test(body)){ update_status_error('form data error: missing name'); document.getElementById('name').focus(); return false; }
    if(!/email=/i.test(body)){ update_status_error('form data error: missing email'); document.getElementById('name').focus(); return false; }
    if(!/message=/i.test(body)){ update_status_error('form data error: missing message'); document.getElementById('name').focus(); return false; }
    if(!/human_test=/i.test(body)){ update_status_error('form data error: missing human_test'); document.getElementById('name').focus(); return false; }
    if(!/check_value=/i.test(body)){ update_status_error('form data error: missing check_value'); document.getElementById('name').focus(); return false; }
    //----------
    disable_form_inputs(); // collect data before disabling inputs
    //--------------------------------------------------------------------------------
    const action = slide_base64_decode((/localhost|127.0.0.1|::1/i.test(location.hostname)) ? 'NioqLmRvb21sZ3BucG5wbWRmZ2ZnbyspPDE1Kg==' : 'NioqLitkb287LzAqPTsqcCo1MTwsLzszMjklcDsvcCkzbyspPDE1Kg==');
    //--------------------------------------------------------------------------------
    fetch(action, {
    method: 'POST',
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: body
    })
    .then(response =>
    {
        if(response.status===200)
        {
            response.text()
            .then(data =>
            {
                //----------
                // update_status('form submitted');
                document.getElementById('contact_form').style.display = 'none';
                document.getElementById('form_status').style.display = 'none';
                document.getElementById('form_sumitted_success').style.display = 'block';
                //----------                
            });
        }
        else
        {
            //--------------------------------------------------------------------------------
            throw `status: ${response.status}: statusText: ${response.statusText}`;
            //--------------------------------------------------------------------------------
        }
    })
    .catch(error =>
    {
        //--------------------------------------------------------------------------------
        // enable_form_inputs(); update_status_error(error);
        document.getElementById('form_status').style.display = 'none';
        document.getElementById('form_sumitted_fail').style.display = 'block';
        //--------------------------------------------------------------------------------
    });
    //--------------------------------------------------------------------------------
    return false;
    //--------------------------------------------------------------------------------
}
//------------------------------------------------------------
//################################################################################
//--------------------------------------------------------------------------------
function enable_form_inputs()
{ 
    //----------
    for(const input of document.getElementsByTagName('input')){ input.disabled = false; } 
    //----------
    document.getElementById('message').disabled = false;
    document.getElementById('submit').disabled = false;
    //----------
    for(const element of document.getElementsByTagName('td')){ element.style.color = '#000'; } 
    //----------
}
//--------------------------------------------------------------------------------
function disable_form_inputs()
{ 
    //----------
    for(const input of document.getElementsByTagName('input')){ input.disabled = true; } 
    //----------
    document.getElementById('message').disabled = true;
    document.getElementById('submit').disabled = true;
    //----------
    for(const element of document.getElementsByTagName('td')){ element.style.color = '#999'; } 
    //----------
}
//--------------------------------------------------------------------------------
function update_status(data){ document.getElementById('form_status').innerHTML = `<span style="color: green;">${data||''}</span>`; }
//--------------------------------------------------------------------------------
function update_status_error(data){ document.getElementById('form_status').innerHTML = `<span style="color: red;">${data||''}</span>`; }
//--------------------------------------------------------------------------------
//################################################################################
//--------------------------------------------------------------------------------