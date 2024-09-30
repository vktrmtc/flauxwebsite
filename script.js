document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.homepage-buttons .homepage-button:nth-child(3)').addEventListener('click', openModal);

    function openModal() {
        const modal = document.getElementById('feedbackModal');
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    window.closeModal = function() {
        const modal = document.getElementById('feedbackModal');
        modal.classList.remove('show');

        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);
    }

    function sendMessage() {
        const message = document.getElementById('message').value;
        const webhookURL = 'https://discord.com/api/webhooks/1287053998867746909/vAv8l76xm3DeyZHHARQgUDorZTb_-HDUz4gQmeCnf0897YGM4DsBZc4FAd6TVkbEEC2t';

        if (message) {
            const embed = {
                content: null,
                embeds: [{
                    description: message,
                    color: 0xff6252,
                    timestamp: new Date(),
                }]
            };

            fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(embed)
            })
            .then(response => {
                if (response.ok) {
                    document.querySelector('.modal-content').innerHTML = `
                        <h2>Thank you for your feedback!</h2>
                        <p>Your feedback has been sent successfully.</p>
                    `;
                    setTimeout(() => {
                        closeModal();
                    }, 3000);
                } else {
                    console.error('Failed to send feedback:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            console.error('Please enter a message.');
        }
    }

    window.onclick = function(event) {
        const modal = document.getElementById('feedbackModal');
        if (event.target === modal) {
            closeModal();
        }
    };

    document.querySelector('.send-button').addEventListener('click', sendMessage);
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navMenu');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});

// Function to open a centered popup window
function openCenteredPopup(url, title, width, height) {
    const screenLeft = window.screenLeft || window.screenX;
    const screenTop = window.screenTop || window.screenY;
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;

    const left = (screenWidth / 2) - (width / 2) + screenLeft;
    const top = (screenHeight / 2) - (height / 2) + screenTop;

    const options = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`;
    window.open(url, title, options);
}

// Support popup button
function openSupportPopup() {
    const url = 'https://discord.com/invite/SQkFwgmGsk';
    openCenteredPopup(url, 'Support', 600, 600);
}

// Invite app popup
function openPopup() {
    const url = 'https://discord.com/oauth2/authorize?client_id=1263669451191226379&permissions=8&integration_type=0&scope=bot+applications.commands';
    openCenteredPopup(url, 'Add App', 600, 600);
}


// dashboard
fetch('https://flauxbot.com/api/bot-status')
    .then(response => response.json())
    .then(data => {
        document.getElementById('bot-status').innerText = data.status;
        document.getElementById('server-count').innerText = data.servers;
    });