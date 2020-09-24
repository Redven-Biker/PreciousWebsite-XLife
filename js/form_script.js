"use strict";
var email_server_url = './ajaxserver/serverfile.php';
var message_server_url = './ajaxserver/serverfile.php';
if($('.send_email_form').attr('action') && ($('.send_email_form').attr('action')) != ''){
    email_server_url = $('.send_email_form').attr('action');
}

if($('.send_message_form').attr('action') && ($('.send_message_form').attr('action') != '')){
    message_server_url = $('.send_message_form').attr('action');
}



$(function () {

    var $ajax = {
        sendEmail: function (p) {
            var form_fill = $(p);

            var form_inputs = form_fill.find(':input');
            var form_data = {};
            form_inputs.each(function () {
                form_data[this.name] = $(this).val(); 
            });
            console.log(form_data);
            $.ajax(
                {
                    url: email_server_url,
                    type: 'get',
                    data: form_data,
                    dataType: 'json',
                    success: function (data) {
                        if (data && !data.error) {
                            $('.invite').addClass('invisible');
                            $('.send_email_form .email_f').addClass('invisible');
                            $('.send_email_form .email_b').addClass('invisible');
                            $('.send_email_form .fields').addClass('invisible');
                            $('.send_email_form .email-ok').removeClass('invisible');
                        }
                        else {
                            console.log('Could not process AJAX request to server');
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('ajax error');
                        
                    }
                });
        },
            
        sendMessage:function (p) {
            var form_fill = $(p);

            // Get the form data.
            var form_inputs = form_fill.find(':input');
            var form_data = {};
            form_inputs.each(function () {
                form_data[this.name] = $(this).val(); 
            });
            console.log(form_data);
            
            $.ajax(
                {
                    url: message_server_url,
                    type: 'get',
                    data: form_data,
                    dataType: 'json',

                    success: function (data) {

                        if (data && !data.error) {

  $('.send_message_form input').val("");
  $('.send_message_form textarea').val("");
  $('.message-ok').removeClass('invisible');
                        }
                        else {
                            $('.message').html(data.error);
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $('.message').html('Error when sending email.');
                    }
            });
        }
    };

    $('.send_email_form').submit(function (event) {
        event.preventDefault();
        console.log('request sent to server');
        $ajax.sendEmail(this);
    });
    
    $('.send_message_form').submit(function (event) {
        event.preventDefault();
        console.log('message should be sent');
        $ajax.sendMessage(this);
    });
    
});

