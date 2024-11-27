document.addEventListener('DOMContentLoaded', () => {
    // Criação das estrelas
    const starContainer = document.querySelector('.star-container');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        starContainer.appendChild(star);
    }


    // Seção de Toggle dos Detalhes dos Projetos
    const toggleButtons = document.querySelectorAll('.toggle-details');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const details = button.parentElement.nextElementSibling;

            if (details.classList.contains('open')) {
                details.classList.remove('open');
                button.textContent = "+"; // Exibe '+'
                button.style.transform = 'rotate(0deg) scale(1)'; // Botão volta ao normal
            } else {
                details.classList.add('open');
                button.textContent = "-"; // Exibe '-'
                button.style.transform = 'rotate(180deg) scale(1.2)'; // Gira 180 graus e aumenta um pouco
            }
        });
    });

    // Header encolhe ao rolar
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // Menu expansível
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');

    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que o clique se propague para outros elementos
        dropdownMenu.classList.toggle('show');
        menuToggle.classList.toggle('open'); // Adiciona a classe 'open' ao botão
    });

    // Fecha o menu dropdown ao clicar fora dele
    document.addEventListener('click', (event) => {
        if (!menuToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
            menuToggle.classList.remove('open'); // Remove a classe 'open' do botão
        }
    });

    // Função da Linha do Tempo
    const timelineItems = document.querySelectorAll('.timeline-item');

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const run = () => {
        timelineItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('in-view');
            }
        });
    };

    window.addEventListener('load', run);
    window.addEventListener('resize', run);
    window.addEventListener('scroll', run);

    // Função do Chat
    const sendMessageButton = document.getElementById('send-message');
    const chatMessageInput = document.getElementById('chat-message');
    const chatResponse = document.getElementById('chat-response');
    const chatMessages = [
        "Olá, seja bem-vindo! Como você se chama?",
        "Prazer em conhecê-lo! Aqui estão alguns dos meus projetos. Você gostaria de saber mais sobre eles?",
        "Perfeito! Abaixo, você encontra meus perfis no LinkedIn e GitHub. Fique à vontade para conferir! :)",
        "O que mais você gostaria de saber?"
    ];
    let messageIndex = 0;

    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.innerHTML = '<span>.</span><span>.</span><span>.</span>';
        chatResponse.appendChild(typingIndicator);
        return typingIndicator;
    }

    function removeTypingIndicator(indicator) {
        chatResponse.removeChild(indicator);
    }

    function sendMessage(message, sender = 'bot') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.innerHTML = `<p>${message}</p>`;
        chatResponse.appendChild(messageElement);

        if (message.includes("LinkedIn") || message.includes("GitHub")) {
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('chat-buttons');

            const linkedInButton = document.createElement('a');
            linkedInButton.href = 'https://www.linkedin.com/in/nat%C3%A1lia-costa-moura-0971662a0/';
            linkedInButton.target = '_blank';
            linkedInButton.textContent = 'LinkedIn';
            buttonContainer.appendChild(linkedInButton);

            const gitHubButton = document.createElement('a');
            gitHubButton.href = 'https://github.com/natnatcmc';
            gitHubButton.target = '_blank';
            gitHubButton.textContent = 'GitHub';
            buttonContainer.appendChild(gitHubButton);

            chatResponse.appendChild(buttonContainer);

            // Simula digitação e envia a próxima mensagem automaticamente
            const typingIndicator = showTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator(typingIndicator);
                sendMessage("O que mais você gostaria de saber?");
                showSuggestions();
            }, 1000);
        }

        chatResponse.scrollTop = chatResponse.scrollHeight; // Rola para a última mensagem
    }

    function botSendMessage() {
        if (messageIndex < chatMessages.length) {
            sendMessage(chatMessages[messageIndex]);
            messageIndex++;
        } else {
            sendMessage("Obrigado por visitar meu portfólio! Se tiver mais perguntas, estou à disposição.");
        }
    }

    function showSuggestions() {
        const suggestions = [
            "Me fale mais sobre seus projetos.",
            "Quais são suas habilidades?",
            "Você tem algum certificado?",
            "Como posso entrar em contato com você?"
        ];

        const suggestionContainer = document.createElement('div');
        suggestionContainer.classList.add('chat-buttons');

        suggestions.forEach(suggestion => {
            const suggestionButton = document.createElement('button');
            suggestionButton.textContent = suggestion;
            suggestionButton.addEventListener('click', () => {
                sendMessage(suggestion, 'user');
                handleSuggestionResponse(suggestion);
            });
            suggestionContainer.appendChild(suggestionButton);
        });

        chatResponse.appendChild(suggestionContainer);
        chatResponse.scrollTop = chatResponse.scrollHeight; // Rola para a última mensagem
    }

    function handleSuggestionResponse(suggestion) {
        const responses = {
            "Me fale mais sobre seus projetos.": "Eu tenho trabalhado em diversos projetos, incluindo sites responsivos e aplicações web. Você pode ver mais detalhes na seção de Projetos.",
            "Quais são suas habilidades?": "Minhas habilidades incluem JavaScript, React, Node.js, HTML, CSS, Python e SQL. Estou sempre aprendendo novas tecnologias!",
            "Você tem algum certificado?": "Sim, tenho certificações em Análise e Desenvolvimento de Sistemas, além de cursos em diversas linguagens de programação.",
            "Como posso entrar em contato com você?": "Você pode me contatar pelo email nataliacostamoura16@gmail.com ou pelo telefone +55 11 96638-2577."
        };

        const typingIndicator = showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator(typingIndicator);
            sendMessage(responses[suggestion]);
            sendMessage("Agora que você descobriu isso, gostaria de saber de mais algo?");
            showYesNoOptions();
        }, 1000);
    }

    function showYesNoOptions() {
        const yesNoContainer = document.createElement('div');
        yesNoContainer.classList.add('chat-buttons');

        const yesButton = document.createElement('button');
        yesButton.textContent = "Sim";
        yesButton.addEventListener('click', () => {
            sendMessage("Sim", 'user');
            showSuggestions();
        });

        const noButton = document.createElement('button');
        noButton.textContent = "Não";
        noButton.addEventListener('click', () => {
            sendMessage("Não", 'user');
            sendMessage("Obrigado por visitar meu portfólio! Se tiver mais perguntas, estou à disposição.");
        });

        yesNoContainer.appendChild(yesButton);
        yesNoContainer.appendChild(noButton);

        chatResponse.appendChild(yesNoContainer);
        chatResponse.scrollTop = chatResponse.scrollHeight; // Rola para a última mensagem
    }

    sendMessageButton.addEventListener('click', () => {
        const message = chatMessageInput.value.trim();
        if (message) {
            sendMessage(message, 'user');
            chatMessageInput.value = '';

            const typingIndicator = showTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator(typingIndicator);
                botSendMessage();
            }, 1000);
        }
    });

    chatMessageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita o envio do formulário ao pressionar Enter
            sendMessageButton.click();
        }
    });

    // Enviar a primeira mensagem do bot
    botSendMessage();

    // Função para mostrar o chat
    const floatingButton = document.querySelector('.floating-button');
    const chatBox = document.querySelector('.chat-box');

    floatingButton.addEventListener('click', () => {
        chatBox.classList.toggle('show');
    });

    // Toggle testimonial content
    const toggleTestimonialButtons = document.querySelectorAll('.toggle-testimonial');
    toggleTestimonialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
            button.textContent = content.style.display === 'block' ? 'Ocultar Depoimento' : 'Ver Depoimento';
        });
    });

    // Carousel functionality
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const inner = carousel.querySelector('.carousel-inner');
        const prev = carousel.querySelector('.carousel-control.prev');
        const next = carousel.querySelector('.carousel-control.next');
        let index = 0;

        const updateCarousel = () => {
            const width = inner.clientWidth;
            inner.style.transform = `translateX(${-index * width}px)`;
        };

        prev.addEventListener('click', () => {
            index = (index > 0) ? index - 1 : inner.children.length - 1;
            updateCarousel();
        });

        next.addEventListener('click', () => {
            index = (index < inner.children.length - 1) ? index + 1 : 0;
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);
        updateCarousel();
    });

    // Modo Escuro/Claro
    const toggleThemeBtn = document.getElementById('toggle-theme');
    const body = document.body;

    toggleThemeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });

    // Formulário de Contato
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        // Validação e envio do formulário
        alert('Formulário enviado com sucesso!');
    });

    const calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };
    
    function updateDisplay() {
        const display = document.querySelector('.calculator-screen');
        display.value = calculator.displayValue;
    }
    
    function handleNumber(number) {
        const { displayValue, waitingForSecondOperand } = calculator;
    
        if (waitingForSecondOperand === true) {
            calculator.displayValue = number;
            calculator.waitingForSecondOperand = false;
        } else {
            calculator.displayValue = displayValue === '0' ? number : displayValue + number;
        }
    }
    
    function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = calculator;
        const inputValue = parseFloat(displayValue);
    
        if (operator && calculator.waitingForSecondOperand) {
            calculator.operator = nextOperator;
            return;
        }
    
        if (firstOperand == null && !isNaN(inputValue)) {
            calculator.firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
    
            calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
            calculator.firstOperand = result;
        }
    
        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
    }
    
    function calculate(firstOperand, secondOperand, operator) {
        if (operator === '+') {
            return firstOperand + secondOperand;
        } else if (operator === '-') {
            return firstOperand - secondOperand;
        } else if (operator === '*') {
            return firstOperand * secondOperand;
        } else if (operator === '/') {
            return firstOperand / secondOperand;
        }
    
        return secondOperand;
    }
    
    function resetCalculator() {
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }
    
    function handleDecimal(dot) {
        if (calculator.waitingForSecondOperand) {
            calculator.displayValue = '0.';
            calculator.waitingForSecondOperand = false;
            return;
        }
    
        if (!calculator.displayValue.includes(dot)) {
            calculator.displayValue += dot;
        }
    }
    
    const keys = document.querySelector('.calculator-keys');
    keys.addEventListener('click', (event) => {
        const { target } = event;
        if (!target.matches('button')) {
            return;
        }
    
        if (target.classList.contains('operator')) {
            handleOperator(target.value);
            updateDisplay();
            return;
        }
    
        if (target.classList.contains('decimal')) {
            handleDecimal(target.value);
            updateDisplay();
            return;
        }
    
        if (target.classList.contains('all-clear')) {
            resetCalculator();
            updateDisplay();
            return;
        }
    
        handleNumber(target.value);
        updateDisplay();
    });
    
    updateDisplay();
    
    // Lista de Tarefas (To-Do List)
    document.getElementById('add-task').onclick = function() {
        const taskInput = document.getElementById('new-task');
        const taskList = document.getElementById('tasks');
        
        if (taskInput.value !== '') {
            const li = document.createElement('li');
            li.textContent = taskInput.value;
            li.onclick = () => {
                li.classList.toggle('completed');
            };
            taskList.appendChild(li);
            taskInput.value = '';
        }
    };
    

    // Minigame das Estrelas
    const gameArea = document.getElementById('game-area');
    const startGameButton = document.getElementById('start-game');
    const scoreDisplay = document.getElementById('score');
    let score = 0;

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        gameArea.appendChild(star);

        star.addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = `Pontuação: ${score}`;
            gameArea.removeChild(star);
            createStar();
        });
    }

    startGameButton.addEventListener('click', () => {
        score = 0;
        scoreDisplay.textContent = `Pontuação: ${score}`;
        gameArea.innerHTML = '';
        createStar();
    });
});


const images = document.querySelectorAll('.image-container img');
let currentIndex = 0;

const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

function updateImagePosition() {
  const newTransformValue = -currentIndex * 600; // 600px é a largura de cada imagem
  document.querySelector('.image-container').style.transform = `translateX(${newTransformValue}px)`;
}

nextButton.addEventListener('click', () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0; // Voltar para a primeira imagem
  }
  updateImagePosition();
});

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = images.length - 1; // Voltar para a última imagem
  }
  updateImagePosition();
});


const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        case '=':
            handleEquals();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }

    updateDisplay();
});

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function handleEquals() {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.firstOperand != null) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}
