<?php
  // email API
  //
  // It uses the php's native mail function http://php.net/manual/en/function.mail.php
  //
  // Requirements:
  //
  //  - A email service installed in the server like sendmail, on ubuntu
  //    you can install it with: sudo apt-get install sendmail
  //    you can see the logs with: sudo tail -f /var/log/mail.log
  //
  //  - Access allowed to the 25 port.
  //    you can check it with telnet aspmx3.googlemail.com 25
  //
  // Common issues:
  //
  //  - You may need to configure the hosts file, if you get errors like:
  //    "My unqualified host name (precise32) unknown; sleeping for retry"
  //
  //    to fix this edit you /etc/hosts file, including: 127.0.0.1 <host-name> <host-name>.local
  //    and restart the sendmail service: sudo service sendmail restart
  //
  //  - You may have the 25 port blocked if you get error like: Connection timed out with aspmx2.googlemail.com.

  function send() {
    $from = 'foo@gmail.com';
    $to = $_REQUEST['to'];
    $subject = $_REQUEST['subject'];
    $message =  $_REQUEST['message'];
    $headers = 'From: ' . $from;

    $errorMsg = '';
    $sent = false;

    if (empty($to)) {
      $errorMsg = "A 'to' param is required";
    } else if (empty($subject) && empty($message)) {
      $errorMsg = "A 'subject' or 'message' param is required";
    } else {
      // a true result didn't mean the email was delivered, it mean the email was accepted to be send.
      $sent = mail($to, $subject, $message, $headers);
    }

    $data = array('sent' => $sent, 'error_msg' => $errorMsg);
    respond_with($data);
  }

  function respond_with($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
  }

  send();
?>
