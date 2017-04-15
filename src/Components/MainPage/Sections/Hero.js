import React, { Component } from 'react';
import SectionCard from './SectionCard';

import zuko from '../../../Assets/Images/MainPage/lucas+zuko.jpg';
import project from '../../../Assets/Images/MainPage/project.png';
import resume from '../../../Assets/Files/LucasMarcelli.pdf';

import './css/hero.css';

class Hero extends Component {
  render(){
    return(
      <section className="hero full-height">
        <SectionCard image={zuko} altText="This cat is the worst for real though."
                     title="Lucas Marcelli" text="An incredibly passionate coder who loves food, cats, space, videogames and much more. Check out my Résumé, or read more about me!"
                     buttons={[
                       {
                         url: resume,
                         external: true,
                         label: "Résumé"
                       },
                       {
                         jump: "#about",
                         label: "Read More"
                       }
                     ]}
                     />
          <SectionCard image={project} title="Projects"
                       text="This is where my sleep lives. It's a good collection of some active and past projects. Games and apps and other fun stuff, check it out."
                       buttons={[
                        {
                          jump:"#projects",
                          label: "Projects"
                        },
                        {
                          url:"https://github.com/lucasmarcelli?tab=repositories",
                          external: true,
                          label: "Github"
                        }
                       ]}
                       />
      </section>
    )
  }
}

export default Hero;
