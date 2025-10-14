let currentQuestion = 0;
let previousQuestions = [];
let issueType = '';
let userAnswers = [];
let backMainAudio = new Audio('shart.mp3');
let resultAudio = new Audio('bass.mp3');
let yesAudio = new Audio('yes.mp3');
let noAudio = new Audio('no.mp3');
let startAudio = new Audio('alarm.mp3');
let startAudio1 = new Audio('trial-sound-effect-101soundboards.mp3');
// Main Question Set
const questions = {
    patent: [
        { question: `Do you have a valid and enforceable Philippine patent for the invention?`, yes: 1, no: 'R0' },
        { question: `Has the infringing party made, used, offered for sale, sold, or imported your patented product or a product derived from your patented process without your authorization?`, yes: 2, no: 'R0' },
        { question: `Were the patented products first put on the Philippine market by you or with your consent (for products *other* than drugs/medicines)? `, yes: 'RE1', no: 3 },
        { question: `Were the patented drugs/medicines introduced in the Philippines or anywhere else by you or with your authorization? `, yes: 'RE1', no: 4 },
        { question: `Was the act done privately and on a non-commercial scale, without significantly harming your economic interests?`, yes: 'RE2', no: 5 },
        { question: `Was the act for experimental use for scientific or educational purposes?`, yes: 'RE3', no: 6 },
        { question: `Was the act related to testing, using, making, or selling the patented drugs/medicines for purposes reasonably related to development and regulatory approvals?`, yes: 'RE4', no: 7 },
        { question: `Was the act the preparation of patented drugs/medicines by a pharmacy or medical professional based on a prescription?`, yes: 'RE5', no: 8 },
        { question: `Was the invention used in a foreign ship, vessel, aircraft, or land vehicle entering the Philippines temporarily, solely for its needs?`, yes: 'RE6', no: 9 },
        { question: `Was the infringing party a prior user, in good faith, using or seriously preparing to use the invention *before* your patent filing/priority date?`, yes: 'RE7', no: 10 },
        { question: `Did the Philippine government authorize the use of the invention for public interest (national security, nutrition, health, etc.) or because your exploitation was anti-competitive?`, yes: 'RE8', no: 11 },
        { question: `Is the use under a valid compulsory license?`, yes: 'RE9', no: 12 },
        { question: `Is the infringing product identical to the product produced by your patented *process*, is the product new, or is it substantially likely made by your process, and you've been unable to determine the process used despite reasonable efforts? (Applies only to process patents)`, yes: 13, no: 'RE10' },
        { question: `Have you brought a civil action for infringement and received a final judgment against the infringer?`, yes: 14, no: 'R1' },
        { question: `Has the infringement continued *after* the final judgment?`, yes: 'R2', no: 'R3' },
    ],
    trademark: [
        { question: "Do you have a registered trademark in the Philippines?", yes: 1, no: 'R0' },
        { question: "Has someone used your trademark without your permission?", yes: 2, no: 'R0' },
        { question: "Did they use a reproduction, counterfeit, copy, or colorable imitation of your mark?", yes: 3, no: 4 },
        { question: "Did they use it on goods/services identical or similar to yours in a way likely to cause confusion?", yes: 'R1', no: 'R0' },
        { question: "Did they reproduce your mark and apply it to labels, packaging, or advertising for similar/identical goods/services?", yes: 'R1', no: 5 }, // 155.2
        { question: "Have they passed off their goods/services as yours?", yes: 6, no: 7 },  // Start of Unfair Competition
        { question: "Did they give their goods a similar appearance to yours to deceive consumers?", yes: 'R2', no: 8 },
        { question: "Did they falsely claim to offer your services?", yes: 'R2', no: 9 }, // 168.3.b
        { question: "Did they make false statements to discredit your goods/services?", yes: 'R2', no: 10 }, // 168.3.c
        { question: "Did they use a false designation of origin, misleading description, or misrepresentation?", yes: 11, no: 'R0' }, // Start of 169
        { question: "Was it likely to cause confusion about affiliation or origin/sponsorship?", yes: 'R3', no: 12 },
        { question: "Did they misrepresent the nature, characteristics, or origin in advertising?", yes: 'R3', no: 'R0' }
    ],
    copyright: [
        { question: `Did someone else use your material?`, yes: 3, no: 1 },
        { question: `Did someone reproduce your material?`, yes: 'R1', no: 2 },
        { question: `Did someone distribute your material?`, yes: 12, no: 'R0' },
        { question: `Did someone publicly perform your work?`, yes: 'R2', no: 4 },
        { question: `Did someone display your material?`, yes: 'R3', no: 5 },
        { question: `Did someone create derivative works, such as sequels or spin-offs, from your material?`, yes: 'R2', no: 6 },
        { question: `Did someone take significant portions of your material?`, yes: 'R4', no: 7 },
        { question: `Did someone upload your material?`, yes: 8, no: 'R0' },
        { question: `Did they do it for personal or commercial gain?`, yes: 9, no: 'R5' },
        { question: `Did they share it on file-sharing platforms or social media (e.g., Google Drive, MediaFire, YouTube)?`, yes: 10, no: 11 },
        { question: `Are people able to download your material?`, yes: 'R6', no: 'R7' },
        { question: `Did someone broadcast your material?`, yes: 'R8', no: 'R0' },
        { question: `Did someone translate your material into another language?`, yes: 'R9', no: 13 },
        { question: `Did someone distribute copies of your material?`, yes: 'R10', no: 14 },
        { question: `Did someone import copies of your material?`, yes: 'R11', no: 15 },
        { question: `Did someone export copies of your material?`, yes: 'R11', no: 'R0' }
    ]
};

// Results for each issue type
const results = {
    patent: {
        R0: "No infringement action possible without a valid patent or if no unauthorized use has occurred.",
        R1: "You can bring a civil action for infringement. You may be awarded for royalties, damage fees, and compensations. See Sec. 76 for more details.",
        R2: "Repeated infringement after final judgment is a criminal offense. Imprisonment for not less than 6 months but not more than 3 years and/or a fine of not less than P100,000 but not emore than P300,000. See Sec. 84 for more details.",
        R3: "The act of infringement had stopped and no prior action are needed. No infringement.",
        RE1: "This use is likely permitted under the 'prior use' exception (Sec. 72.1). No infringement.",
        RE2: "This use is likely permitted under the 'private, non-commercial use' exception (Sec. 72.2). No infringement.",
        RE3: "This use is likely permitted under the 'experimental use' exception (Sec. 72.3). No infringement.",
        RE4: "This use is likely permitted under the 'regulatory testing' exception for drugs/medicines (Sec. 72.4). No infringement.",
        RE5: "This use is likely permitted under the 'pharmacy/prescription' exception for drugs/medicines (Sec. 72.5). No infringement.",
        RE6: "This use is likely permitted under the 'temporary foreign vessel' exception (Sec. 72.6). No infringement.",
        RE7: "This use is likely permitted under the 'prior user rights' (Sec. 73). No infringement.",
        RE8: "This use is likely permitted under 'government use' (Sec. 74).  No infringement.",
        RE9: "This use is permitted under a compulsory license. No infringement.",
        RE10: "The burden of proof shifts to the defendant to show they used a different process (Sec. 78). Infringement likely."
    }
    ,
    trademark: {
        R0: "No trademark infringement or unfair competition detected based on your answers. However, consider consulting with an IP lawyer to discuss potential other legal avenues.",
        R1: "Trademark Infringement (Sec. 155): Imprisonment of 2-5 years and a fine of P50,000-P200,000. You can pursue civil action for damages and injunction (Sec. 156, 157).",
        R2: "Unfair Competition (Sec. 168): Imprisonment of 2-5 years and a fine of P50,000-P200,000.  Remedies under Sec. 156, 157, and 161 apply.",
        R3: "False Designation of Origin/Misrepresentation (Sec. 169.1): Imprisonment of 2-5 years and a fine of P50,000-P200,000. Civil action for damages and injunction (Sec. 156, 157).",
    },
    copyright: {
        R0: "No penalty.",
        R1: "The infringer may face civil liability, where the copyright owner can claim actual damages, profits made from the infringement, or statutory damages (between PHP 50,000 to PHP 150,000) for each work infringed. In criminal cases, the infringer can face imprisonment of 1 to 3 years and a fine ranging from PHP 50,000 to PHP 150,000 for each infringement.",
        R2: "The copyright holder may sue for actual damages or statutory damages. The infringer can also face criminal penalties, including imprisonment of 1 to 3 years and fines between PHP 50,000 to PHP 150,000 for each unauthorized derivative work created.",
        R3: "The infringer may face civil liability where the copyright owner can seek actual or statutory damages. In criminal cases, the infringer may be imprisoned for 1 to 3 years and fined between PHP 50,000 to PHP 150,000 per violation.",
        R4: "The infringer could be sued for damages, including loss of profits or statutory damages. For criminal cases, penalties may include 1 to 3 years of imprisonment and fines between PHP 50,000 to PHP 150,000 for each instance of plagiarism or unauthorized adaptation.",
        R5: "The court may order the infringer to pay for losses caused by the infringement, statutory damages (PHP 50,000 to PHP 150,000 per work infringed), and also seek an injunction to stop further infringement.",
        R6: "The uploader may face both civil and criminal penalties. Statutory damages can be awarded, and in criminal cases, the infringer may face imprisonment of 3 to 6 years and fines between PHP 150,000 to PHP 500,000, especially for online distribution, which is considered more serious.",
        R7: "the uploader could face fines (PHP 50,000 to PHP 150,000) and even imprisonment of 1 to 3 years.",
        R8: "The copyright holder may seek damages for unauthorized broadcasting or streaming. Criminal penalties may include imprisonment of 3 to 6 years and fines of PHP 150,000 to PHP 500,000, especially for repeated offenses or large-scale broadcasting.",
        R9: "The copyright owner may seek civil remedies, including damages and an injunction. The criminal penalty includes 1 to 3 years imprisonment and fines between PHP 50,000 to PHP 150,000 per violation.",
        R10: "The copyright owner may sue for actual damages or statutory damages and request the seizure and destruction of unauthorized copies. The infringer could be fined PHP 50,000 to PHP 150,000 and may also face imprisonment of 1 to 3 years. If it’s a large-scale or commercial distribution, penalties may be higher.",
        R11: "The copyright holder may seek damages for unauthorized broadcasting or streaming. Criminal penalties may include imprisonment of 3 to 6 years and fines of PHP 150,000 to PHP 500,000, especially for repeated offenses or large-scale broadcasting.",
    }
};

// Start button click listener
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startBtn').addEventListener('click', startQuiz);
    document.getElementById('backToMainFromQuestions').addEventListener('click', () => {
        backMainAudio.play();
        resetQuiz();
    });
    document.getElementById('yes-button').addEventListener('click', () => {
        yesAudio.play();
        handleAnswer('yes');
    });
    document.getElementById('no-button').addEventListener('click', () => {
        noAudio.play();
        handleAnswer('no');
    });
    document.getElementById('previous-button').addEventListener('click', () => {
        backMainAudio.play();
        goBack();
    });
    document.getElementById('backToMainFromResult').addEventListener('click', () => {
        backMainAudio.play();
        resetQuiz();
    });
    document.getElementById('skip-button').addEventListener('click', () => {
        handleSkip();
    });
});

function startQuiz() {
    startAudio.play();
    startAudio1.loop = true;
startAudio1.play();
    const selectedArea = document.getElementById('area').value;
    issueType = selectedArea;
    currentQuestion = 0;
    userAnswers = [];
    previousQuestions = [];  // Reset previous questions

    document.getElementById('expertForm').style.display = 'none';
    document.getElementById('questionsContainer').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('ace').src = 'DDPhoenixSerious.webp';
    showQuestion();
}

function showQuestion() {
    const questionData = questions[issueType][currentQuestion];
    document.getElementById('question').textContent = questionData.question;
    document.getElementById('previous-button').style.display = currentQuestion === 0 ? 'none' : 'inline-block';

    if (issueType === 'patent' && currentQuestion >= 2 && currentQuestion <= 8 || currentQuestion == 12) {
        document.getElementById('skip-button').style.display = 'inline-block';
    } else {
        document.getElementById('skip-button').style.display = 'none';
    }

    document.querySelector('header').style.display = 'none';
}

function handleAnswer(answer) {
    const questionData = questions[issueType][currentQuestion];
    const nextStep = questionData[answer];

    if (typeof nextStep === 'string' && nextStep.startsWith('R')) {
        displayResult(nextStep);
    } else {
        previousQuestions.push(currentQuestion);
        currentQuestion = nextStep;
        showQuestion();
    }
}

function handleSkip() {
    previousQuestions.push(currentQuestion);
    currentQuestion++;
    if (currentQuestion >= questions[issueType].length) {
        displayResult('R0'); // or any default result if the end of questions is reached
    } else {
        showQuestion();
    }
}

function goBack() {
    if (previousQuestions.length > 0) {
        currentQuestion = previousQuestions.pop();
        showQuestion();
    }
}

function displayResult(resultCode) {
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('questionsContainer').style.display = 'none';
    document.getElementById('result').textContent = results[issueType][resultCode];
    resultAudio.play();
    document.body.style.backgroundImage = "url('Judges-bench.webp')";
    document.getElementById('ace').src = 'Judge-3D-UseGavel29.webp';

}

function resetQuiz() {
    startAudio1.pause();         // Pause the audio
    startAudio1.currentTime = 0; // Reset to the beginning
    document.getElementById('expertForm').style.display = 'block';
    document.getElementById('questionsContainer').style.display = 'none';
    document.getElementById('result-container').style.display = 'none';
    resultAudio.pause();
    resultAudio.currentTime = 0;
    document.body.style.backgroundImage = "url('bg.jpg')";
    document.getElementById('ace').src = 'DDPhoenixRead.webp';
    document.querySelector('header').style.display = 'block';

}