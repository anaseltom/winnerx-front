import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import { useState, useRef, useEffect } from "react";
import ExploreContainer from "../components/ExploreContainer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { users } from "../actions/UserAction";
import { RootStore } from "../store";

const Pharagraph: React.FC = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState<any>("");
  useEffect(() => {
    dispatch(users());
  }, []);

  useEffect(() => {
    setTimeout(function () {
      setLoader("loader_remove");
    }, 500);
  }, []);

  return (
    <>
      <div id="preloder" className={loader}>
        <div className="loader"></div>
      </div>
      <Header />

      <div className="pharagraph_wrapper">
        <div className="row">
          <div className="title">Terms of Service</div>
        </div>

        <div className="MuiContainer-root MuiContainer-maxWidthLg">
          <h2 className="section-heading">Terms of Service</h2>
          <div className="">
            <p className="">
              These terms of service ('Terms of Service'), along with the prize
              draw terms (“Prize Draw Terms”) and privacy policy (“Privacy
              policy”) constitute a legally binding agreement made between you,
              whether personally or on behalf of an entity (“you”, “User”), and
              the WinnerX (“we”, “us”), e-mail: ..., relating to the use of our
              website and mobile app (collectively, 'The Site') and your
              participation in our campaign draws.
            </p>
            <p>
              Any user using the Site (“User”, “you”) agrees with and undertakes
              to comply with the terms indicated herein and in Terms of Service
              published on our Site. If you do not accept all provisions of
              Prize Draw Terms or Terms of Service, or have no legal capacity to
              be bound by them, you shall immediately refrain from using the
              Site.
            </p>
          </div>
          <h2 className="section-heading">General provisions</h2>
          <div className="">
            <p className="">
              1. Any User using the Site agrees with and undertakes to comply
              with the Terms of Service, Prize Draw Terms and Privacy Policy. If
              you do not accept all provisions of Terms of Service, Prize Draw
              Terms or Privacy Policy, or have no legal capacity to be bound by
              them, you shall immediately refrain from using the Site.
            </p>
            <p>
              2. These Terms of Service are valid from ... . We reserve the
              right to amend the Terms of Service without prior notification. In
              the event of modifications, changes to the Prize Draw Terms take
              effect from the moment publishing on the Site. You undertake to
              review this Prize Draw Terms regularly in order to be aware of its
              current provisions. Your continued use of the Site, purchasing of
              products and participating in prize draws (“Services”), aRer the
              modification is made constitutes your acceptance of the
              modification.
            </p>
          </div>
          <h2 className="section-heading">Terms and conditions</h2>
          <div className="">
            <p className="">
              3. By entering into the agreement, you declare that you are an
              adult, you are able to conclude legally binding contracts and that
              all information that you provide to us in connection with
              registering an account and using our Services is accurate,
              truthful and up-to-date.
            </p>
            <p>
              4. If it is revealed that the User has violated the Terms of
              Service, in particular that he is a minor, or provides inaccurate
              or untrue information, WinnerX has the right to limit, suspend or
              withdraw the access to our Service.
            </p>
            <p>
              5. If your access to our Service has been withdrawn, limited or
              suspended due to a Terms of Service violation, our Service will no
              longer be available for you.
            </p>
            <p>
              6. Registering on our Site more than once is expressly prohibited.
            </p>
          </div>
          <h2 className="section-heading">User registration</h2>
          <div className="">
            <p className="">
              7. You agree that under no circumstances will you try to access
              our Service by pretending to be someone else or by using a
              username that is offensive. In such event, we may, at our sole
              discretion, decide to deny or revoke access to our Service.
            </p>
            <p>
              8. The user is solely responsible for updating the data and other
              details provided during registration in order to keep them true,
              accurate, current and complete. In the event of failure to comply
              with this obligation, WinnerX has the right to limit, suspend or
              revoke access to our Service.
            </p>
            <p>
              9. Whenever you register with the Site, you agree to keep your
              password confidential and will be responsible for all use of your
              account and password, which means that you agree to bear all
              costs, expenses and damages incurred by WinnerX due to any
              unauthorized or illegal use of your account.
            </p>
            <p>
              10. It is not allowed to transfer or sell your account to another
              person, nor is it allowed to use another person's account.
            </p>
          </div>
          <h2 className="section-heading">User representations and liability</h2>
          <div className="">
            <p className="">
              11. By using the Site, you represent and warrant that:
            </p>
            <p>
              • You will not use the Site for any illegal or unauthorized
              purpose, including a_empting to gain unauthorized access to
              computer systems owned or controlled by us, engage in any activity
              that purpose is disrupt, diminish or interfere with the
              performance of the Site, as well as for the purpose of criminal or
              delictual activity which includes drug dealing, harassment,
              gambling, stalking and any other activity that results in third
              parties’ rights infringement.
            </p>
            <p>
              • Your use of the Site will not violate any applicable law or
              regulation, in particular you will not engage in any activity
              which impersonates any person or entity, including, but not
              limited to, our employee or our user, and other activities which
              harasses, degrades, intimidates or is hateful towards any
              individual or group of individuals on the basis of religion,
              gender, sexual orientation, race, ethnicity, age, or disability
              and which are harmful, abusive, unlawful, threatening, harassing,
              blasphemous, immoral, defamatory, obscene, pornographic,
              pedophilic, invasive of another's privacy or other rights,
              hateful, or racially, ethnically objectionable, disparaging,
              relating or encouraging to money laundering or harms or could harm
              minors in any way or otherwise unlawful in any manner whatsoever.
            </p>
            <p>
              • All information you submit will be true, accurate, current, and
              complete.
            </p>
            <p>
              • You will maintain the accuracy of such information and promptly
              update such registration information, as necessary.
            </p>
            <p>
              • Except where consent is given by WinnerX, you will not use the
              Site to advertise or induce other users to purchase any products
              or services.
            </p>
            <p>
              • You have the legal capacity, and you agree to comply with these
              Terms of Service.
            </p>
            <p>
              • You are not a minor in the jurisdiction in which you reside.
            </p>
            <p>
              • You will not transfer or sell your account to another party.
            </p>
            <p>
              • You will not access the Site through or using automated or
              non-human means, whether through a bot, script, or otherwise,
              including using of robots, crawlers, data mining tools in the
              purpose of downloading any data from our Site, except for search
              engines that comply with our robots.txt file (e.g. Google).
            </p>
            <p>
              • You will not use any information obtained from the Site and our
              Services in order to contact other users in the purpose of
              spamming, transmidng junk email or chain le_ers.
            </p>
            <p>
              • You will not use your account on behalf of third person,
              including, but not limited to, accepting payment or other benefit
              from a third person in exchange for your performance of any
              commercial activity on our Site.
            </p>
            <p>
              12. If you provide any informainon that is untrue, inaccurate, not
              current, or incomplete, we have the right to suspend or terminate
              your account and refuse any and all current or future use of the
              Site (or any porinon thereof).
            </p>
            <p>
              13. You acknowledge that you are aware that any of your activities
              on our Site are subject to applicable laws and may be subject to
              investigation by applicable law enforcement authorities and you
              are solely responsible for any damages, costs and expenses we
              incur for your reason.
            </p>
          </div>
          <h2 className="section-heading">Payment Gateway</h2>
          <div className="">
            <p className="">
              14. Payment processing companies are separate entities and aRer
              selecting their payment method, you may be subject to their Terms
              of Service they provide.
            </p>
            <p>
              15. We do not save or store any payment related data. The
              information required by payment processing companies is provided
              to them directly and via a secure connection.
            </p>
            <p>
              16. The User is obliged to keep the received transaction records
              as well as policies and terms of service of payment processing
              companies.
            </p>
            <p>
              17. Our product prices displayed on the Site are inclusive of VAT.
            </p>
            <p>
              18. Upon the purchase, you shall be charged in a currency relevant
              to applicable laws, as stated in the order page. We will be not
              responsible for any additional local bank charges, in particular
              fees related to processing your order payment and fees due to
              currency conversion.
            </p>
          </div>
          <h2 className="section-heading">Refund policy</h2>
          <div className="">
            <p className="">
              19. Orders placed through our Site are final and are not subject
              to cancellation or refund.
            </p>
            <p>
              20. In case you received defective product as a result of a
              purchase, you enjoy the right to replace the product, unless you
              exceed what is necessary to check the product and subject to
              warranties and guarantees provided by the product’s manufacturer.
              To exercise your right for product replacement, contact us 14 days
              from product collection.
            </p>
            <p>
              21. Products received as a result of a prize draw winning are not
              subject to any replacement, return or refund.
            </p>
          </div>
          <h2 className="section-heading">Intellectual property rights</h2>
          <div className="">
            <p className="">
              22. Unless otherwise indicated, the Site, all source code,
              databases, functionality, soRware, website designs, audio, video,
              text, photographs, and graphics on the Site (collectively, the
              “Content”) and the trademarks, service marks, and logos contained
              therein (the “Marks”) are owned or controlled by us or licensed to
              us, and are protected by copyright and trademark laws and various
              other intellectual property rights and unfair competition laws of
              the United Arab Emirates, foreign jurisdictions, and international
              conventions.
            </p>
            <p>
              23. The Content and the Marks are provided on the Site “AS IS” for
              your information and personal use only. Except as expressly
              provided in these Terms and Conditions or in any other binding
              agreement with us, no part of the Site and no Content or Marks may
              be copied, reproduced, aggregated, republished, uploaded, posted,
              publicly displayed, encoded, translated, transmi_ed, distributed,
              sold, licensed, or otherwise exploited for any commercial purpose
              whatsoever, without our express prior wri_en permission. We
              expressly prohibit any modification and creation of derivative
              works with the use of any Content and the Marks placed on the
              Site.
            </p>
            <p>
              24. Provided that you are eligible to use the Site, you are
              granted a limited license to access and use the Site and to
              download or print a copy of any portion of the Content to which
              you have properly gained access solely for your personal,
              non-commercial use, unless stated otherwise. We reserve all rights
              not expressly granted to you in and to the Site, the Content and
              the Marks.
            </p>
          </div>
          <h2 className="section-heading">User Submissions</h2>
          <div className="">
            <p className="">
              25. You accept that the use of our Site may have adverse effects.
              You will be solely responsible for such effects and events and
              will have no claim against WinnerX as a result of their
              occurrence. If you come into contact with content and materials
              from external sources while using the website, you are fully
              responsible for their use. To the extent permi_ed by applicable
              law, WinnerX is not responsible for the accuracy, safety,
              usefulness or such content and materials or any third party’s
              rights related to them.
            </p>
            <p>
              26. To the extent permi_ed by applicable law, you agree that you
              waive any claim against WinnerX relating to your exposure to
              content or material that is defamatory, offensive, indecent or
              inaccurate.
            </p>
          </div>
          <h2 className="section-heading">Digital media</h2>
          <div className="">
            <p className="">
              27. In case of winning the prize draw, you consent that we have
              the right to use of your image, voice and name in any digital
              records including, but not limited to, photographs, videos and
              call recordings of the prize, the winning phone call and the
              collection of the prize, on our Site, on any of our social media
              profile, local and regional press.
            </p>
          </div>
          <h2 className="section-heading">
            Disclaimer for Third Party Applica3ons
          </h2>
          <div className="">
            <p className="">
              28. If you use any third party application while using our site,
              you are subject to the terms and rules of its provider and assume
              sole responsibility and risk related to your use of the
              application. WinnerX will not be liable to you or to any third
              party in connection with your use of the third party application.
            </p>
            <p>
              29. WinnerX has no control over, or is responsible for, the
              accuracy, completeness, or legality of any third party application
              available on the Site and therefore shall not be liable for any
              damages, costs, losses and expenses incurred by the user in
              connection with the use of third party applications.
            </p>
          </div>
          <h2 className="section-heading">Limitations of Liability</h2>
          <div className="">
            <p className="">
              30. The site is provided on an as-is and as-available basis. You
              agree that your use of the site and our services will be at your
              sole risk. To the fullest extent permi_ed by law, we disclaim all
              warranties, express or implied, in connections with the Site and
              your use thereof, including, without limitation, the implied
              warranties of merchantability, fitness for a particular purpose
              and non-infringement. We make no warranties or representations
              about the accuracy or completeness of the Site’s content or the
              content of any websites linked to the site and we will assume no
              liability or responsibility for any:
            </p>
            <p>
              (1) errors, mistakes, or inaccuracies of content and materials
            </p>
            <p>
              (2) personal injury or property damage, of any nature whatsoever,
              resulting from your access to and use of the site,
            </p>
            <p>
              (3) unauthorized access to or use of our secure servers or all
              personal data or financial information stored therein,
            </p>
            <p>
              (4) interruption or cessation of transmission to or from the site,
            </p>
            <p>
              (5) any bugs, viruses, trojan horses, or the like which may be
              transmi_ed to or through the site by any third party, and/or
            </p>
            <p>
              (6) any errors or omissions in any content and materials or for
              any loss or damage of any kind incurred as a result of the use of
              any content posted, transmi_ed or otherwise made available via the
              site. We do not warrant, guarantee, or assume responsibility for
              any product or service advertised, or offered by a third party
              through the site, any hyperlinked website, or any website or
              mobile application featured in any banner or other advertising,
              and we will not be a party to or in any way be responsible for
              monitoring any transaction between you any third-party providers
              of products or services.
            </p>
            <p>
              31. As with making transactions through any medium or in any
              environment, you should use your best judgment and exercise
              caution where appropriate.
            </p>
            <p>
              32. We reserve the right to change, modify, or remove the contents
              of the Site at any time or for any reason at our sole discretion
              without notice. However, we have no obligation to update any
              information on our Site. We also reserve the right to modify or
              discontinue all or part of the Site without notice at any time.
            </p>
            <p>
              33. We will not be liable to you or any third party for any
              modification, price change, suspension, or discontinuance of the
              Site.
            </p>
            <p>
              34. We cannot guarantee the Site will be available at all times.
              We may experience hardware, soRware, or other problems or need to
              perform maintenance related to the Site, resulting in
              interruptions, delays, or errors.
            </p>
            <p>
              35. We reserve the right to change, revise, update, suspend,
              discontinue, or otherwise modify the Site at any time or for any
              reason without notice to you, as well as to establish temporal
              limits to the use of Service, regarding e.g. maximum time of
              content retention, number of postings or messages and the
              frequency of access to the Site. You agree that we have no
              liability whatsoever for any loss, damage, or inconvenience caused
              by your inability to access or use the Site during any downtime or
              discontinuance of the Site.
            </p>
            <p>
              36. Nothing in these Terms of Service will be construed to oblige
              us to maintain and support the Site or to supply any corrections,
              updates, or releases in connection therewith.
            </p>
            <p>
              37. To the fullest extent permi_ed by law, in no event will we or
              our affiliates, directors, employees, agents or providers be
              liable to you or any third party for any direct, indirect,
              consequential, exemplary, incidental, special, or punitive
              damages, including lost profit, lost revenue, loss of data, or
              other damages arising from your use of the Site and our Services.
              This limitation does not apply to your consumer rights.
            </p>
            <p>
              38. Visiting the Site, sending us e-mails, and completing online
              forms constitute electronic communications, You consent to receive
              electronic communications. You hereby waive any rights or
              requirements under any statutes, regulations, rules, ordinances,
              or other laws in any jurisdiction which require an original
              signature or delivery or retention of non-electronic records, or
              to payments or the granting of credits by any means other than
              electronic means.
            </p>
            <p>
              39. You hereby declare that you agree and understand that any
              claims against WinnerX in relation to the use of the Site are
              limited to the amount you have paid for our Service.
            </p>
            <p>
              40. We hereby expressly represent that we give no warranties,
              express or implied, including, without the limitation, warranties
              regarding merchantability, correctness, non-infringement and
              fitness for a particular purpose of our site.
            </p>
            <p>
              41. We reserve the right refuse or terminate your access to our
              Services, including deletion of your account and blocking your IP
              address, without prior notice and without providing any
              justification. You agree that you will hold no claims against
              WinnerX in that regard.
            </p>
          </div>
          <h2 className="section-heading">Indemnity</h2>
          <div className="">
            <p className="">
              42. In the event that you breach the Terms of Service, infringe
              rights of any third parties or cause damage to a third party, you
              undertake to indemnify and hold harmless WinnerX, its affiliates,
              directors, employees, agents or providers from and against any,
              claims, liability, losses, damages or expenses.
            </p>
          </div>
          <h2 className="section-heading">No-spam policy</h2>
          <div className="">
            <p className="">
              43. We expressly prohibit the activity of sending advertisements,
              unsolicited messages and other spam to our e-mail addresses and
              through our information technology systems. You acknowledge that
              such actions constitute a violation of the Terms of Service and
              may also constitute a violation of cybercrime laws. If we become
              aware of such activities, we will report them to the appropriate
              authorities.
            </p>
          </div>
          <h2 className="section-heading">Final provisions</h2>
          <div className="">
            <p className="">
              44. We reserve the right to transfer or assign our rights under
              this agreement to a third party.
            </p>
            <p>
              45. Our failure to exercise or enforce any right or provision of
              these Terms of Service shall not operate as a waiver of such right
              or provision.
            </p>
            <p>
              46. If any provision or part of a provision of these Terms of
              Service is determined to be unlawful, void, or unenforceable, that
              provision or part of the provision is deemed severable from these
              Terms of Service and does not affect the validity and
              enforceability of any remaining provisions.
            </p>
            <p>
              47. You hereby waive any and all defenses you may have based on
              the electronic form of these Terms of Service and the lack of
              signing by the parties hereto to execute these Terms of Service.
            </p>
            <p>
              48. You represent that any legal steps related to the use of our
              Services will be taken by you within a reasonable time, in any
              case no later than 1 year aRer the cause of action.
            </p>
            <p>
              49. These Terms of Service, your use of the Site, as well as
              contracts concluded with us are governed by and construed in
              accordance with laws of the United Arab Emirates. Disputes arising
              from your use of our Service will be subject to the exclusive
              jurisdiction of the Courts of the Dubai International Financial
              Centre.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Pharagraph;
