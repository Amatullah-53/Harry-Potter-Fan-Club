$(document).ready(function () {
    
    $('.join-club-btn').click(function () {
        $('#joinClubModal').modal('show');
    });

    $('#getMembershipBtn').click(function () {
        var username = $('#usernameInput').val();
        var password = $('#passwordInput').val();

        if (username === 'amatullah' && password === '3495') {
            $('#joinClubModal').modal('hide');
            $('#congratsModal').modal('show');
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });




});




