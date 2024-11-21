import React, { useState } from 'react';
import '../styles/AboutUs.css';
import DefaultDashboard from './DefaultDashboard';

const AboutUs = () => {
  const [readMore1, setReadMore1] = useState(false);
  const [readMore2, setReadMore2] = useState(false);
  const [readMore3, setReadMore3] = useState(false);
  const [readMore4, setReadMore4] = useState(false);
  const [readMore5, setReadMore5] = useState(false);

  return (
    <div className="about-us">
      <DefaultDashboard />
      <h1 style={{ color: "#772222" }}>About the Online Charity Platform</h1>
      <p>
        Our mission is to support local charity organizations and help them
        secure donations during challenging times. Your contribution can make a
        real difference in the lives of those in need. We believe in
        transparency and ensuring that every penny donated goes directly to
        those who need it the most.
      </p>

      <div className="about-us-details">
        <h2 style={{ color: "#772222" }}>
          <i className="fas fa-hand-holding-heart"></i> How We Help
        </h2>
        <p>
          We partner with local charities to provide them with the tools they
          need to raise awareness and secure donations efficiently. Our platform
          is designed to make donating easy and accessible for everyone.
        </p>
      </div>

      <div className="contact-us">
        <h2 style={{ color: "#772222" }}>
          <i className="fas fa-phone-alt"></i> Contact Us
        </h2>
        <p>
          If you have any questions or need more information, feel free to reach
          out to us!
        </p>
        <div className="social-media">
          <a
            href="https://facebook.com"
            target="_blank"
            className="facebook"
            rel="noopener noreferrer"
          >
            <i className="fa fa-facebook-square"></i> Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            className="twitter"
            rel="noopener noreferrer"
          >
            <i className="fa fa-twitter-square"></i> Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="instagram"
            rel="noopener noreferrer"
          >
            <i className="fa fa-instagram-square"></i> Instagram
          </a>
          <a href="mailto:contact@charityplatform.com" className="email">
            <i className="fa fa-envelope"></i> Email
          </a>
        </div>
      </div>

      {/* New Sections */}
      {/* First section */}
      <h1>Empowering Local Charities</h1>
      <img
        src="https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_clip,w_960,h_720,f_auto,q_auto/unsplashcom/photo-1667897386088-8a1fc1f8a321"
        alt="Empowering Charities"
        className="about-image"
      />
      <p>
        Supporting the backbone of our community. The Covid-19 pandemic has
        severely impacted local charities, leading to a significant decline in
        donor contributions. Our mission is to address these economic challenges
        by creating a platform that connects charities with potential donors,
        enabling them to secure the funding necessary to continue their vital
        work.
      </p>

      <button onClick={() => setReadMore1(!readMore1)}>
        {readMore1 ? "Read Less" : "Read More"}
      </button>

      {readMore1 && (
        <p>
          We strive to provide a sustainable solution that fosters long-term
          relationships between charities and their supporters. Our platform
          helps charities enhance their visibility, engage with their donors,
          and address the challenges they face. By joining forces with us, local
          organizations can continue to thrive and positively impact those they
          serve.
        </p>
      )}

      {/* Second section */}
      <h2>Addressing Economic Challenges</h2>
      <img
        src="https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_clip,w_960,h_720,f_auto,q_auto/unsplashcom/photo-1643321611132-15f7b8a63347"
        alt="Economic Challenges"
        className="about-image"
      />
      <p>
        The Covid-19 pandemic has severely impacted local charities, leading to
        a significant decline in donor contributions. Our mission is to address
        these economic challenges by creating a platform that connects charities
        with potential donors, enabling them to secure the funding necessary to
        continue their vital work.
      </p>

      <button onClick={() => setReadMore2(!readMore2)}>
        {readMore2 ? "Read Less" : "Read More"}
      </button>

      {readMore2 && (
        <p>
          We aim to offer a long-term solution that will provide charities with
          the tools and resources to ensure a stable financial future. By
          collaborating with both local and global donors, we create a bridge
          for charitable causes to gain exposure and support.
        </p>
      )}

      {/* Third section */}
      <h2>Enhancing Visibility for Charities</h2>
      <img
        src="https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_clip,w_960,h_720,f_auto,q_auto/unsplashcom/photo-1622143387830-491f68824238"
        alt="Visibility for Charities"
        className="about-image"
      />
      <p>
        Many local charities struggle to find new donors due to a lack of
        visibility and outreach. Our platform aims to enhance the visibility of
        these organizations, showcasing their missions, projects, and the
        beneficiaries they serve. By amplifying their stories, we can inspire
        more individuals and businesses to contribute, revitalizing the support
        needed to sustain their operations.
      </p>

      <button onClick={() => setReadMore3(!readMore3)}>
        {readMore3 ? "Read Less" : "Read More"}
      </button>

      {readMore3 && (
        <p>
          Through detailed profiles and transparent reporting, we make it easier
          for supporters to discover new causes to contribute to, making
          philanthropy more accessible for everyone.
        </p>
      )}

      {/* Fourth section */}
      <h2>Facilitating Donor Engagement</h2>
      <img
        src="https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_clip,w_960,h_720,f_auto,q_auto/unsplashcom/photo-1588653987287-b044a1d39d89"
        alt="Donor Engagement"
        className="about-image"
      />
      <p>
        We recognize that fostering ongoing relationships with donors is crucial
        for the success of any charity. Our system is designed to facilitate
        donor engagement by providing regular updates on projects, impact
        reports, and opportunities for involvement. By creating a community
        around charitable giving, we aim to encourage donors to continue their
        support and inspire others to join their efforts.
      </p>

      <button onClick={() => setReadMore4(!readMore4)}>
        {readMore4 ? "Read Less" : "Read More"}
      </button>

      {readMore4 && (
        <p>
          We offer tools for charities to stay in touch with their supporters,
          providing transparency and updates that show how their donations are
          making a tangible difference.
        </p>
      )}

      {/* Fifth Section */}
      <h2>Meet Our Dedicated Team</h2>
      <img
        src="https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_clip,w_960,h_720,f_auto,q_auto/unsplashcom/photo-1667897385908-c9a45ec81e50"
        alt="Dedicated Team"
        className="about-image"
      />
      <p>
        Passionate professionals committed to making a difference. Our
        leadership team brings a wealth of experience in nonprofit management
        and social impact. Their visionary approach drives our mission forward,
        ensuring that we remain focused on the needs of local charities while
        adapting to the evolving landscape of philanthropy.
      </p>

      <button onClick={() => setReadMore5(!readMore5)}>
        {readMore5 ? "Read Less" : "Read More"}
      </button>

      {readMore5 && (
        <p>
          Our team members are deeply committed to community development and
          work tirelessly to create an ecosystem where charities and donors can
          collaborate seamlessly.
        </p>
      )}

      {/* Sixth Section - Final without Read More */}
      <h2>Our Impactful Initiatives</h2>
      <img
        src="https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_clip,w_960,h_720,f_auto,q_auto/unsplashcom/photo-1610209853524-3001097b986b"
        alt="Impactful Initiatives"
        className="about-image"
      />
      <p>
        Our health and wellness fair brought together various health service
        providers to offer free screenings and health education to the
        community. This event not only promoted overall well-being but also
        connected attendees with local charities focused on health services,
        increasing their visibility and potential donor engagement.
      </p>

      <img
        src="https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_clip,w_960,h_720,f_auto,q_auto/unsplashcom/photo-1577459572581-1525359ef0b3"
        alt="Community Impact"
        className="about-image"
      />
    </div>
  );
};

export default AboutUs;
