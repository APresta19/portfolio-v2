import '../styles/ProjectGrid.css';
import Card from '../Card'; 
import { useState } from 'react';
import Header from './Header';

function ProjectGrid()
{
    const [isAnimating, setAnimating] = useState(false);
    const [clickedCardId, setClickedCardId] = useState(null);
    let cardCopy = null;

    const cards = [
        {id: 1, title: "Card 1", description: "Description 1", tags: ["C#", "Unity", "Game"], videoRef: "https://www.youtube.com/embed/tgbNymZ7vqY"},
        {id: 2, title: "Card 2", description: "Description 2", tags: [], videoRef: ""},
        {id: 3, title: "Card 3", description: "Description 3", tags: [], videoRef: ""},
        {id: 4, title: "Card 4", description: "Description 4", tags: [], videoRef: ""},
        {id: 5, title: "Card 5", description: "Description 5", tags: [], videoRef: ""},
        {id: 6, title: "Card 6", description: "Description 6", tags: [], videoRef: ""},
        {id: 7, title: "Card 7", description: "Description 7", tags: [], videoRef: ""},
        {id: 8, title: "Card 8", description: "Description 8", tags: [], videoRef: ""},
        {id: 9, title: "Card 9", description: "Description 9", tags: [], videoRef: ""},
        {id: 10, title: "Card 10", description: "Description 10", tags: [], videoRef: ""},
    ];

    function handleClickCard(event, id)
    {
        setClickedCardId(id);

        //prevent scrolling
        document.body.classList.add("stop-scroll");
        
        //grab the card div that they clicked
        const card = event.currentTarget;
        const cardBounds = card.getBoundingClientRect();

        cardCopy = card.cloneNode(true);
        cardCopy.style.visibility = "hidden";
        insertTempCard(id);

        //use dataset to store original pos
        card.dataset.originalLeft = cardBounds.left;
        card.dataset.originalTop = cardBounds.top;
        card.dataset.originalWidth = cardBounds.width;
        card.dataset.originalHeight = cardBounds.height;

        //where does the card move to
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        card.style.position = 'fixed';
        card.style.left = `${cardBounds.left}px`;
        card.style.top = `${cardBounds.top}px`;
        card.style.width = `${cardBounds.width}px`;
        card.style.height = `${cardBounds.height}px`;
        console.log("First: " + card.dataset.originalWidth);

        //force a reflow for transitions
        card.offsetHeight;


        setAnimating(true);
        card.style.transition = 'top 0.5s ease, left 0.5s ease, transform 1s ease';
        card.style.left = `${45}%`;
        card.style.top = `${30}%`;
        card.style.height = `${420}px`;
        card.style.width = `${200}px`;
        card.style.transform = 'scaleY(2) scaleX(3) rotateY(180deg)';

        //look for card object
        let cardObj = getCardByID(id);

        setTimeout(() => {
            //reset card
            card.innerHTML = '';
            
            //fill card
            const title = document.createElement("h1");
            title.classList.add("flipped-card-title");
            const projectTags = cardObj.tags;

            const video = document.createElement("iframe");
            const desc = document.createElement("div");
            const backButton = document.createElement("button");

            title.style.transform = "rotateY(180deg) scaleY(.75) scaleX(.5)";
            desc.style.transform = "rotateY(180deg) scaleY(.75) scaleX(.5)";
            video.style.transform = "rotateY(180deg) scaleY(.75) scaleX(.5)";
            backButton.style.transform = "rotateY(180deg) scaleY(.75) scaleX(.5)";

            title.textContent = cardObj.title;
            desc.textContent = cardObj.description;
            backButton.textContent = "Back";

            video.width = "500";
            video.height = "500";
            video.src = cardObj.videoRef;
            video.style.flexGrow = "2";

            desc.style.height = "100px";

            backButton.addEventListener("click", (event) => placeCardBack(event, id));

            //create header
            const topSec = document.createElement("div");
            topSec.style.display = "flex";
            topSec.style.justifyContent = "center";
            topSec.style.alignItems = "center";
            topSec.style.width = "100%";

            const leftTop = document.createElement("div");
            const rightTop = document.createElement("div");

            rightTop.style.display = "flex";

            leftTop.appendChild(title);
            topSec.appendChild(rightTop);

            //create project tags
            for(let i = 0; i < projectTags.length; i++)
            {
                //don't have to check for nullity because tags are hardcoded and the loop wouldn't run
                const tag = document.createElement("div"); 

                tag.classList.add("tag");
                tag.style.transform = "rotateY(180deg) scaleY(.75) scaleX(.5)";

                tag.textContent = projectTags[i];
                rightTop.appendChild(tag);
            }
            topSec.appendChild(leftTop);
            card.appendChild(topSec);

            card.appendChild(video);
            card.appendChild(desc);
            card.appendChild(backButton);
            console.log(card.style.width);
        }, 200);
    }
    function placeCardBack(event, id)
    {
        const card = event.currentTarget.closest('.card'); //get the card
        
        const originalLeft = card.dataset.originalLeft;
        const originalTop = card.dataset.originalTop;
        const originalWidth = card.dataset.originalWidth;
        const originalHeight = card.dataset.originalHeight;
        
        //force a reflow for transitions
        card.offsetHeight;

        card.style.transition = 'top 0.5s ease, left 0.5s ease, transform 1s ease';
        card.style.left = `${originalLeft}px`;
        card.style.top = `${parseFloat(originalTop) + 50}px`;
        card.style.zIndex = 2;
        /*
        console.log(originalWidth);
        console.log(`Before setting back: ${card.style.width}, ${card.style.height}`);
        card.style.width = `${originalWidth}vw`;
        card.style.height = `${originalHeight}vh`;
        console.log(`After setting back: ${card.style.width}, ${card.style.height}`);*/

        card.style.transform = 'scale(1) rotateY(0deg)';

        console.log("Second: " + originalWidth);

        const cardObj = getCardByID(id); //get card
        setTimeout(() => {
            //reset previous content
            card.innerHTML = '';

            

            //fill content back
            const title = document.createElement("div");
            const description = document.createElement("div");

            title.textContent = cardObj.title;
            description.textContent = cardObj.description;

            /*display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 35px;*/
            //doesn't work???
            card.style.display = "flex";
            card.style.flexDirection = "column";
            card.style.alignItems = "center";
            card.style.justifyContent = "flex-start";
            card.style.padding = "130px 30px";
            card.style.height = `${70}px`;

            card.appendChild(title);
            card.appendChild(description);
        }, 200);
        setTimeout(() => {
            //reset overriden styles
            card.style = '';
            console.log("Reset card styles");
            //reset clicked
            setClickedCardId(null);

            //remove clone
            cardCopy.remove();
            
            //put card back to it's original type of position
            card.style.position = 'static';

            card.classList.remove("card-clicked");
            //enable scrolling
            document.body.classList.remove("stop-scroll");

        }, 1000);
    }
    function pxToVw(px) {
        return (px / window.innerWidth) * 100;
    }
    function pxToVh(px) {
        return (px / window.innerHeight) * 100;
    }
    function handleTransitionEnd(event)
    {
        console.log("Transition ended");
        setAnimating(false);
    }
    function getCardByID(id)
    {
        let card = null;
        for(let i = 0; i < cards.length; i++)
        {
            if(cards[i].id == id)
            {
                card = cards[i];
            }
        }
        return card;
    }
    function insertTempCard(id)
    {
        const grid = document.getElementById("project-grid");

        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id === id) {
                const refNode = grid.children[i];
                grid.insertBefore(cardCopy, refNode);
                break; //save some time :)
            }
        }
    }

    return(
        <>
            <Header />
            <div id="project-sec">
                <div id="category-list">
                    <h2 className="project-category">Games</h2>
                    <h2 className="project-category">Websites</h2>
                    <h2 className="project-category">Other</h2>
                </div>
                <div id="project-grid">
                    {cards.map((card) =>
                        <Card key={card.id} card={card} isclicked={(clickedCardId === card.id) ? +true : +false} onClick={(event) => handleClickCard(event, card.id)}></Card>
                    )}
                </div>
            </div>
        </>
    );
}
export default ProjectGrid;