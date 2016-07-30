/**
 * Created by minhtran1 on 6/27/2016.
 */
define(function() {
    var UC01 = {
        'msg1': 'The Username or Password you entered is incorrect.',
        'msg2': 'The username and the company email address does not match. Please try again.'
    };

    var UC03 = {
        'msg1': 'Update personal information successfully.',
        'msg2': 'This field is required.',
        'msg3': 'Are you sure you want to delete these assignments?',
        'msg4': 'Are you sure you want to delete the selected skill metric?',
        'msg5': 'Update company information successfully.',
        'msg6': 'Update technical skill successfully.',
        'msg7': 'Update additional information successfully.',
        'mail1': {
            'subject': '[TMS] Remind to verify <<employee_full_name>> Technical Skill',
            'body': 'Dear <<line_manager_first_name>>,<br/>The technical skills of <<employee_full_name>> (Code: <<employee_code>>) under your line has been updated and this update requires your verification.<br/>Please arrange your time to verify this update.<br/>You can access TMS via following link: <<tms_link>><br/>Best Regards,<br/>TMS'
        },
        'mail2': {
            'subject': '[TMS] Remind to verify <<employee_full_name>> Skill Metric',
            'body': 'Dear <<line_manager_first_name>>,<br/><<employee_full_name>> (Code: <<employee_code>>) under your line has been updated and this update requires your verification.<br/>Please arrange your time to verify this update.<br/>You can access TMS via following link: <<tms_link>><br/>Best Regards,<br/>TMS'
        }
    };

    var UC09 = {
        'msg1': 'Please select which CV format you want to output'
    }

    var UC18 = {
        'msg1': 'This is a required field.',
        'msg2': 'Add Employee successfully.',
        'msg3': 'Username has already existed',
        'msg4': 'Only support: .jpg, .png, .bmp, .jpeg',
        'msg5': 'Please upload image which has size less than or equal to 1MB',
        'msg6': 'Invalid email format'
    };

    var UC15 = {
        'msg1': {
                    'msg1_1': 'No result were found to match your search.',
                    'msg1_2': 'Try modifying your search criteria'
                },
        'msg2': "Value 'From' is not greater than value 'To'!"
    };

    return {
        'UC01': UC01,
        'UC03': UC03,
        'UC09': UC09,
        'UC18': UC18,
        'UC15': UC15
    };
});