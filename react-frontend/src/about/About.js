import React, { Component } from 'react';
import './About.css';

class About extends Component {

    render() {
        return (
            <div className="about-container">
                <div className="container">
                    {/* Titolo dell'about */}
                    <h1 className="about-title"><b>Benvenuto su NoteToDo</b></h1>

                    <div className="about-content">
                        {/* Sezione "Chi siamo" */}
                        <p><b>Chi siamo</b></p>
                        <p>
                            Benvenuto su NoteToDo, il tuo compagno affidabile per gestire le tue attività quotidiane in modo semplice ed efficiente.
                            Siamo appassionati di aiutarti a organizzare la tua vita in modo che tu possa concentrarti sulle cose che contano di più.
                        </p>

                        {/* Sezione "La Nostra Missione" */}
                        <p><b>La Nostra Missione</b></p>
                        <p>
                            La nostra missione è semplificare la tua giornata offrendoti uno strumento intuitivo e potente per prendere appunti e gestire le tue attività.
                            Sappiamo quanto sia importante per te massimizzare la tua produttività e ridurre lo stress legato agli impegni quotidiani.
                            NoteToDo è progettato per rendere il processo di annotazione e gestione delle attività un'esperienza senza sforzo.
                        </p>

                        {/* Sezione "Caratteristiche Principali" */}
                        <p><b>Caratteristiche Principali</b></p>
                        <p><b>1. Facilità d'Uso</b></p>
                        <p>
                            Abbiamo creato NoteToDo con l'utente al centro del nostro design.
                            L'interfaccia pulita e intuitiva ti permette di iniziare a prendere appunti e a organizzare le tue attività in pochi istanti.
                        </p>

                        <p><b>2. Interfaccia Tematica</b></p>
                        <p>
                            Personalizza l'aspetto di NoteToDo con diverse opzioni di tema.
                            Scegli uno stile che rispecchi il tuo gusto personale per una migliore esperienza utente.
                        </p>

                        <p><b>3. Assistenza Clienti 24/7</b></p>
                        <p>
                            Il nostro team di assistenza clienti è disponibile 24 ore su 24, 7 giorni su 7, per rispondere alle tue domande e risolvere eventuali problemi.
                            Siamo qui per garantire che la tua esperienza con NoteToDo sia sempre positiva e senza intoppi.
                        </p>

                        <p><b>4. Privacy e Sicurezza al Primo Posto</b></p>
                        <p>
                            La tua privacy è fondamentale per noi. NoteToDo utilizza tecnologie avanzate di crittografia per garantire la sicurezza delle tue informazioni personali e delle tue attività.
                            Puoi utilizzare la piattaforma con la tranquillità che i tuoi dati sono al sicuro.
                        </p>

                        <p><b>5. Supporto Multilingue</b></p>
                        <p>
                            NoteToDo supporta diverse lingue per assicurare un'esperienza utente globale e accessibile.
                        </p>

                        {/* Sezione "Contattaci" */}
                        <p><b>Contattaci</b></p>
                        <p>
                            Siamo qui per te. Se hai domande, suggerimenti o desideri condividere la tua esperienza con NoteToDo, non esitare a contattarci.
                            Il nostro team dedicato è sempre pronto ad assisterti.
                        </p>

                        {/* Conclusione */}
                        <p>
                            Grazie per scegliere NoteToDo per le tue esigenze di gestione delle attività. Rendiamo insieme ogni giorno più organizzato e produttivo!
                        </p>

                        <br/><p><b>Nota bene:</b> questa è solo una pagina d'esempio. Non tutte le caratteristiche descritte sono implementate. </p>
                    </div>
                </div>

                {/* Footer */}
                <footer className="footer_about">
                    <div className="footer_about-content">
                        <p>&copy; 2024 NoteToDo. Tutti i diritti riservati.</p>
                    </div>
                </footer>
            </div>
        );
    }
}

export default About;
