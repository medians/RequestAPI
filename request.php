<?php

if (!empty($_POST['type']))
{

    switch ($_POST['type']) 
    {
        case 'login':
            echo (!empty($_POST['email']) && !empty($_POST['password'])) ? 'User logged in as '. $_POST['email'] : 'Some Fields are missed';
            break;
        
        default:
            echo 'Request successfully received';
            break;
    }
}
