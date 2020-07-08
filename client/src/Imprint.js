import React, { useContext } from 'react';
import { Context } from "./Context";
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

export default function Imprint() {
    const { gapClass } = useContext(Context);


    return (
        <DocumentTitle title="Imprint">
            <div className={`${gapClass} imprint`}>
                <h2>imprint.</h2>
                <Link className="link-component" to={"/about"}>back</Link>
                <div className="imprint-content">
                    <section>
                        <h3>Privacy Notice</h3>
                        <p>
                            Etikett Radio values the privacy of users, listeners, hosts, members and others who visit and use www.etikett-radio.com. The protection of your data and privacy is very important to us and we want you to be sure of how your personal information and data is used.
                        </p>
                        <p>
                            We DO NOT collect any personal information or data when you visit www.etikett-radio.com, and we WILL NOT share, license or swap any personal information or data with third parties without your consent.
                        </p>
                        <h4>We will only collect personal data when you:</h4>
                        <ul>
                            <li>Fill and submit a request on our ‘Contact’ form</li>
                            <li>Initiate contact through email and/or chat room</li>
                            <li>Register as a host in our ‘Staff Only’ section</li>
                            <li>Submit a show for our schedule, show descriptions and/or archives</li>
                        </ul>
                        <h4>What type of personal data is collected?</h4>
                        <p>
                            We will only collect data that you submit - such as, but not limited to, full name, email address, Soundcloud links, Facebook profile, images, etc…
                        </p>
                        <p>
                            If you upload photos or videos, add comments, or interact in our chat room, this information can be read by anyone that visits etikett-radio.com and may be used for purposes over which we or you have no control. Therefore Etikett Radio is not liable for any information that you submit to the website.
                        </p>
                        <p>
                            You may share personal information while using Etikett Radio, for example while in the chat room you may provide information about yourself, or share links to personal accounts - such as Facebook or Soundcloud. We encourage you to be mindful of this Privacy Notice when using the chat room even though we do not save any conversations on our servers.

                        </p>
                        <p>
                            By visiting <span>etikett-radio.com</span> you are acknowledging and accepting the practices described in this Privacy Notice, to the extent permitted by law.
                        </p>
                    </section>
                    <section>
                        <h3>Data Security</h3>
                        <p>
                            Although we do not collect personal information or data, we cannot ensure or warrant the security of any information that you share in the chatroom. We cannot guarantee that such information may not be accessed, disclosed, altered or destroyed by breach of any of our physical, technical, or managerial security measures. Any personal information that is shared by users is done so at their own risk.
                    </p>
                    </section>
                    <section>
                        <h3>Cookies</h3>
                        <h4>What are cookies?</h4>
                        <p>
                            An HTTP cookie (also called web cookie, Internet cookie, browser cookie, or simply cookie) is a small piece of data sent from a website and stored on the user's computer by the user's web browser while the user is browsing. Cookies were designed to be a reliable mechanism for websites to remember stateful information (such as items added in the shopping cart in an online store) or to record the user's browsing activity (including clicking particular buttons, logging in, or recording which pages were visited in the past). They can also be used to remember pieces of information that the user previously entered into form fields, such as names, addresses, passwords, and credit-card numbers. <br />
                        (Souce - <a href="https://en.wikipedia.org/wiki/HTTP_cookie" target="_blank" rel="noopener noreferrer" className="link-component">Wikipedia</a> )
                    </p>
                        <p>
                            Etikett Radio uses cookies exclusively to identify users when they use the chatroom or logging in as hosts.
                    </p>
                        <p>
                            We use third-party services (Twitch) for video streaming and we don’t have control over their use of cookies. Please visit <a href="https://www.twitch.tv/p/legal/cookie-policy/" target="_blank" rel="noopener noreferrer" className="link-component">Twitch.tv</a> for more information on Twitch’s use of cookies.
                    </p>
                    </section>
                    <section>
                        <h3>Licencing</h3>
                        <p>
                            All music broadcast on Etikett Radio is licenced under GEMA’s Web Radio Tarif. For more information on the GEMA Web Radio Tarif please read the product description of our tarif: <br />
                            <a href="https://www.gema.de/fileadmin/user_upload/Musiknutzer/Tarife/Tarife_sonstige/tarif_radio.pdf" target="_blank" rel="noopener noreferrer" className="link-component">Gema Tarife, PDF</a>
                        </p>
                        <p>
                            If you have any questions, concerns, suggestions and/or would like more information, please use our contact form or email us directly at info@etiekttradio.com
                    </p>

                    </section>
                    <section>
                        <h3>Address</h3>
                        <ul className="address">
                            <li>Catalyst Institute for Creative Arts and Technology GmbH [formerly dBs Berlin GmbH]</li>
                            <li>Funkhaus Berlin</li>
                            <li>Nalepastraße 18</li>
                            <li>12459 Berlin</li>
                        </ul>
                    </section>
                    <section className="website-builder">
                        <p>This website was designed and built by:</p>
                        <div>
                            <ul>
                                <li>Adrienn Tollas</li>
                                <li>adrienntollas@gmail.com</li>

                            </ul>
                            <ul>
                                <li>Francisco Chiarino</li>

                                <li>francisco.chiarino@gmail.com</li>

                            </ul>
                            <ul>
                                <li>Simon Schötz</li>
                                <li>simonschtz@gmail.com</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </DocumentTitle>
    )
}
