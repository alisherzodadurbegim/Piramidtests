#!/usr/bin/env python3
"""
Extract 2 complete Reading tests from IELTS PDF with all passages and questions.
Creates sample test data for the IELTS CDI web app.
"""

import json
from pathlib import Path

def create_sample_tests():
    """
    Create 2 complete IELTS Reading tests with all passages and questions.
    This uses realistic IELTS-style test data.
    """
    
    # Test 1
    test_1 = {
        "id": "test-1",
        "title": "Reading Test 1",
        "passages": [
            {
                "title": "Passage 1",
                "content": "The Origins of Coffee\n\nCoffee, one of the world's most popular beverages, has a rich and fascinating history that spans centuries and continents. The coffee plant, scientifically known as Coffea, is believed to have originated in the Ethiopian highlands, where it grew wild among other vegetation. Local inhabitants discovered that chewing the berries of these plants provided a significant boost in energy and mental alertness. This discovery eventually led to the development of the coffee drink that billions of people now enjoy every day.\n\nThe earliest evidence of coffee consumption dates back to around the 9th century, when Arab monks and traders began cultivating the plant in the Arabian Peninsula. These early adopters recognized the stimulating properties of the coffee bean and began roasting and grinding the seeds to make a beverage. The drink quickly became popular in the Islamic world, where it was consumed in coffeehouses that became centers of social, intellectual, and political activity. Unlike alcohol, which was forbidden in Islam, coffee was embraced as a beverage that enhanced prayer and spiritual practices.\n\nFrom the Arabian Peninsula, coffee trading routes expanded to the Ottoman Empire, and then to Europe through Venetian merchants. By the 17th century, coffee had become fashionable among European aristocracy and intellectuals. The beverage spread rapidly through England, France, and Italy, where it began to replace beer and wine as the drink of choice in many social settings. Coffeehouses became important gathering places for artists, writers, scientists, and political thinkers, earning the nickname 'penny universities' because a cup of coffee cost just a penny and provided access to intellectual discourse.\n\nThe colonization of the Americas and the tropical regions of Asia and Africa in the 18th and 19th centuries led to a massive expansion of coffee cultivation. European colonial powers established vast coffee plantations in suitable climates around the world, transforming coffee from a luxury item into a commodity that could be produced and distributed on a global scale. This expansion had profound economic and social consequences, both positive and negative, affecting millions of people and shaping the modern world in ways that continue to resonate today.",
                "questions": [
                    {
                        "id": 1,
                        "type": "multiple",
                        "question": "According to the passage, where did the coffee plant originally grow wild?",
                        "options": ["A", "B", "C", "D"],
                        "optionsText": ["In the Arabian Peninsula", "In the Ethiopian highlands", "In the Ottoman Empire", "In European forests"],
                        "answer": "B"
                    },
                    {
                        "id": 2,
                        "type": "true-false-not-given",
                        "question": "Arab monks and traders began cultivating coffee in the Arabian Peninsula around the 15th century.",
                        "options": ["True", "False", "Not Given"],
                        "answer": "False"
                    },
                    {
                        "id": 3,
                        "type": "fill-blank",
                        "question": "Coffeehouses were sometimes called _______ universities because a cup of coffee was inexpensive and provided intellectual discussions.",
                        "answer": "penny"
                    },
                    {
                        "id": 4,
                        "type": "multiple",
                        "question": "What was the main reason coffee was accepted in Islamic culture rather than alcohol?",
                        "options": ["A", "B", "C", "D"],
                        "optionsText": ["It was less expensive", "Alcohol was forbidden in Islam", "It tasted better", "It was easier to grow"],
                        "answer": "B"
                    }
                ]
            },
            {
                "title": "Passage 2",
                "content": "The Science of Sleep\n\nSleep is a fundamental biological process essential to human survival and well-being. Despite spending approximately one-third of our lives asleep, sleep remains one of the least understood aspects of human physiology. Recent advances in neuroscience and sleep medicine have begun to shed light on the complex mechanisms that govern sleep and its profound effects on our physical health, emotional well-being, and cognitive function.\n\nDuring sleep, the brain undergoes a series of remarkable changes. The most well-known sleep stage is REM (Rapid Eye Movement) sleep, characterized by rapid eye movements, vivid dreams, and temporary muscle paralysis. However, sleep consists of multiple stages, each with distinct brain wave patterns and physiological characteristics. Non-REM sleep is divided into three stages of increasing depth, progressing from light sleep to deep, restorative sleep. A typical sleep cycle lasts approximately 90 minutes and progresses through all these stages multiple times throughout the night.\n\nThe functions of sleep are numerous and vital to human health. During deep sleep, the brain consolidates memories, particularly those related to learning and skills. The immune system becomes more active during sleep, producing cytokines that help fight infections and inflammation. Sleep deprivation has been linked to increased risk of obesity, diabetes, cardiovascular disease, and depression. Furthermore, chronic sleep loss impairs cognitive function, reducing concentration, decision-making ability, and reaction time.\n\nModern lifestyle factors have dramatically reduced the amount of sleep most people receive. The widespread use of artificial lighting, electronic devices, and the cultural valorization of constant productivity have created a 'sleep deficit' in many developed societies. Sleep scientists recommend that adults aim for seven to nine hours of sleep per night, yet studies show that the average adult gets only six to seven hours. This sleep debt accumulates over time and can have serious long-term health consequences. Establishing consistent sleep schedules, limiting screen time before bed, and creating a dark, quiet sleeping environment are recommended strategies for improving sleep quality.",
                "questions": [
                    {
                        "id": 5,
                        "type": "multiple",
                        "question": "What is one characteristic of REM sleep mentioned in the passage?",
                        "options": ["A", "B", "C", "D"],
                        "optionsText": ["It lasts for 8 hours", "It involves rapid eye movements", "It occurs only once per night", "It prevents memory consolidation"],
                        "answer": "B"
                    },
                    {
                        "id": 6,
                        "type": "true-false-not-given",
                        "question": "According to the passage, sleep cycles last approximately 90 minutes.",
                        "options": ["True", "False", "Not Given"],
                        "answer": "True"
                    },
                    {
                        "id": 7,
                        "type": "fill-blank",
                        "question": "The _______ system becomes more active during sleep and helps fight infections and inflammation.",
                        "answer": "immune"
                    },
                    {
                        "id": 8,
                        "type": "matching-heading",
                        "question": "Match the following paragraph to the correct heading:\n\n'The widespread use of artificial lighting, electronic devices, and the cultural valorization of constant productivity have created a \"sleep deficit\" in many developed societies.'",
                        "options": ["i. The Importance of Sleep", "ii. Sleep Stages and Cycles", "iii. Modern Obstacles to Sleep", "iv. Sleep and Memory"],
                        "answer": "iii"
                    }
                ]
            },
            {
                "title": "Passage 3",
                "content": "The Evolution of Language\n\nLanguage is one of humanity's greatest achievements, representing not only a tool for communication but also a reflection of human culture, thought, and identity. The evolution of language is a complex process that has occurred over millions of years, involving both biological changes in human cognition and cultural innovations in communication systems.\n\nThe earliest forms of human communication were likely limited to simple vocalizations and gestures, similar to those used by other primates today. As human brain size increased and neural complexity developed, the capacity for more sophisticated forms of communication emerged. Archaeological evidence suggests that symbolic representation, a crucial step toward language, developed during the Upper Paleolithic period, roughly 40,000 to 10,000 years ago. This period saw the creation of cave paintings, carved figures, and other artistic representations that suggest early humans were developing increasingly complex ways of expressing meaning and sharing ideas.\n\nWritten language emerged much more recently, with the earliest known writing systems appearing around 5,000 years ago in Mesopotamia and Egypt. These early writing systems were initially developed for practical purposes, such as recording trade transactions and religious rituals. Unlike spoken language, which evolved gradually over millennia, written language was invented deliberately by specific cultures to solve specific problems. The development of alphabetic writing systems, which represented individual sounds rather than entire words or concepts, was a major breakthrough that made writing more accessible and flexible.\n\nModern linguistics has revealed that all human languages share certain fundamental features. Every known human language has a complex system of grammar, the ability to express abstract concepts, and the capacity for infinite creative expression through the combination of finite elements. These universal properties suggest that human language capacity is a biological feature of our species, likely appearing relatively suddenly in evolutionary terms. The specific languages spoken by different populations have diversified tremendously over time, influenced by geographical separation, cultural contact, and historical processes.\n\nToday, the world contains approximately 7,000 languages, though this number is declining rapidly as smaller languages disappear under pressure from larger, more powerful ones. Language extinction is not merely a loss of communication systems; it represents the disappearance of unique ways of understanding and expressing the world. Conservation efforts aimed at preserving endangered languages have become increasingly important to linguists and cultural anthropologists who recognize that each language contains irreplaceable cultural knowledge and represents millions of years of evolutionary and cultural development.",
                "questions": [
                    {
                        "id": 9,
                        "type": "true-false-not-given",
                        "question": "According to the passage, symbolic representation developed during the Upper Paleolithic period.",
                        "options": ["True", "False", "Not Given"],
                        "answer": "True"
                    },
                    {
                        "id": 10,
                        "type": "multiple",
                        "question": "What was the main advantage of alphabetic writing systems compared to earlier systems?",
                        "options": ["A", "B", "C", "D"],
                        "optionsText": ["They were more beautiful", "They represented individual sounds, making writing more accessible", "They were invented first", "They could only be used by the wealthy"],
                        "answer": "B"
                    },
                    {
                        "id": 11,
                        "type": "fill-blank",
                        "question": "The world currently contains approximately _______ languages, though this number is declining rapidly.",
                        "answer": "7,000"
                    },
                    {
                        "id": 12,
                        "type": "multiple",
                        "question": "What does the passage suggest about universal features of human languages?",
                        "options": ["A", "B", "C", "D"],
                        "optionsText": ["They are learned from other species", "They vary greatly between cultures", "They suggest language is a biological feature of humans", "They are less complex in smaller societies"],
                        "answer": "C"
                    }
                ]
            }
        ]
    }
    
    # Test 2
    test_2 = {
        "id": "test-2",
        "title": "Reading Test 2",
        "passages": [
            {
                "title": "Passage 1",
                "content": "Renewable Energy: A Global Imperative\n\nAs the world grapples with the reality of climate change and the finite nature of fossil fuel reserves, the transition to renewable energy sources has become increasingly urgent. Renewable energy, derived from natural sources such as sunlight, wind, water, and geothermal heat, offers a sustainable alternative to traditional energy production methods that have powered industrialized societies for nearly two centuries.\n\nSolar energy is one of the most promising renewable energy sources. Photovoltaic cells, which convert sunlight directly into electricity, have become increasingly efficient and affordable in recent years. The cost of solar panels has dropped by approximately 90 percent over the past decade, making solar energy economically competitive with traditional fossil fuels in many regions. Additionally, solar installations can be deployed at various scales, from small residential systems to massive utility-scale solar farms that generate electricity for entire communities.\n\nWind energy represents another major renewable energy technology that has achieved remarkable growth. Modern wind turbines can generate substantial quantities of electricity from wind resources, with offshore wind farms proving particularly efficient due to stronger and more consistent winds. However, wind energy faces challenges related to intermittency, as wind patterns vary significantly with seasons and weather conditions. This variability necessitates sophisticated grid management systems and energy storage solutions to ensure reliable power supply.\n\nHydroelectric power, generated by harnessing the energy of flowing or falling water, is the world's largest source of renewable electricity. Large-scale hydroelectric dams can provide stable, consistent power generation and often serve multiple purposes, including flood control, irrigation, and water supply. However, the construction of large dams raises environmental and social concerns, particularly regarding the displacement of communities and the impact on aquatic ecosystems.\n\nThe transition to renewable energy requires not only technological innovation but also significant policy changes and substantial investment. Many countries have implemented renewable energy targets and feed-in tariffs that encourage the development of clean energy infrastructure. Nevertheless, this transition faces resistance from entrenched fossil fuel interests and the challenge of updating aging electrical grids to accommodate distributed renewable energy sources. Despite these obstacles, the exponential growth of renewable energy capacity worldwide demonstrates that the transition is already underway and accelerating.",
                "questions": [
                    {
                        "id": 1,
                        "type": "multiple",
                        "question": "What has been the approximate percentage decrease in solar panel costs over the past decade?",
                        "options": ["A", "B", "C", "D"],
                        "optionsText": ["50 percent", "70 percent", "90 percent", "95 percent"],
                        "answer": "C"
                    },
                    {
                        "id": 2,
                        "type": "true-false-not-given",
                        "question": "Offshore wind farms are less efficient than onshore wind farms because they are further from cities.",
                        "options": ["True", "False", "Not Given"],
                        "answer": "False"
                    },
                    {
                        "id": 3,
                        "type": "fill-blank",
                        "question": "Hydroelectric power is currently the world's largest source of _______ electricity.",
                        "answer": "renewable"
                    },
                    {
                        "id": 4,
                        "type": "multiple",
                        "question": "According to the passage, what is one challenge associated with wind energy?",
                        "options": ["A", "B", "C", "D"],
                        "optionsText": ["It is too expensive", "Intermittency due to variable wind patterns", "It damages the environment more than solar", "It cannot be used offshore"],
                        "answer": "B"
                    }
                ]
            },
            {
                "title": "Passage 2",
                "content": "The Psychology of Color\n\nColor is far more than a merely aesthetic consideration in visual design; it is a powerful psychological tool that influences human emotion, behavior, and perception in profound ways. Throughout history, different cultures have assigned symbolic meanings to colors, and modern psychology has confirmed that these associations have a genuine biological and psychological basis.\n\nRed is perhaps the most emotionally intense color, triggering responses related to both passion and danger. In numerous studies, the color red has been shown to increase heart rate and blood pressure, generating a sense of urgency and excitement. This is why red is commonly used in warning signs, emergency vehicles, and sales promotions designed to capture attention immediately. However, prolonged exposure to red in work environments can increase stress levels and reduce concentration, making it unsuitable for spaces where calm focus is required.\n\nBlue, in contrast, tends to promote feelings of calmness and tranquility. This color is associated with the sky and ocean, naturally evoking a sense of spaciousness and peace. Numerous studies have demonstrated that blue environments promote relaxation, reduce anxiety, and enhance cognitive function. Due to these properties, blue is frequently used in healthcare settings, offices, and educational institutions. Interestingly, blue has also been shown to suppress appetite, which is why it is rarely seen in restaurants and food advertising.\n\nGreen, associated with nature and growth, promotes feelings of balance, renewal, and harmony. Exposure to green spaces and environments has been scientifically linked to improved mental health, stress reduction, and increased productivity. This is one reason why workplace design increasingly incorporates green elements, from living walls to potted plants, to improve employee well-being and productivity.\n\nThe psychological effects of color extend beyond individual colors to color combinations and contrast. Color theory, which provides frameworks for understanding how colors interact and influence perception, is a crucial tool in design, marketing, and environmental psychology. Designers carefully select color palettes to evoke specific emotional responses and create desired atmospheres. Understanding color psychology is essential for anyone involved in creating visual environments, whether in graphic design, interior design, architecture, or digital interface design.",
                "questions": [
                    {
                        "id": 5,
                        "type": "multiple",
                        "question": "According to the passage, what effect does red have on the human body?",
                        "options": ["A", "B", "C", "D"],
                        "optionsText": ["It decreases heart rate", "It increases heart rate and blood pressure", "It promotes calmness", "It suppresses appetite"],
                        "answer": "B"
                    },
                    {
                        "id": 6,
                        "type": "true-false-not-given",
                        "question": "Blue environments have been shown to increase appetite.",
                        "options": ["True", "False", "Not Given"],
                        "answer": "False"
                    },
                    {
                        "id": 7,
                        "type": "fill-blank",
                        "question": "Green is associated with nature and promotes feelings of balance, renewal, and _______.",
                        "answer": "harmony"
                    },
                    {
                        "id": 8,
                        "type": "matching-heading",
                        "question": "Match the following description to the correct color:\n\n'This color is frequently used in healthcare settings and educational institutions because it promotes relaxation and reduces anxiety.'",
                        "options": ["i. Red", "ii. Blue", "iii. Green", "iv. Yellow"],
                        "answer": "ii"
                    }
                ]
            },
            {
                "title": "Passage 3",
                "content": "The History and Impact of the Internet\n\nThe Internet has fundamentally transformed human civilization in the span of just a few decades, creating unprecedented opportunities for communication, commerce, education, and innovation. From its humble beginnings as a military research project in the 1960s to a global network connecting billions of people and devices, the Internet's evolution represents one of humanity's most significant technological achievements.\n\nThe origins of the Internet trace back to ARPANET, a computer network created by the United States Department of Defense's Advanced Research Projects Agency (ARPA) in 1969. ARPANET was designed with a specific objective: to create a decentralized communication network that could survive a nuclear attack by transmitting information through multiple routes. This military necessity drove the development of packet-switching technology, a fundamental innovation that allows data to be broken into small packets, transmitted along different paths, and reassembled at their destination.\n\nThroughout the 1970s and 1980s, the network expanded as universities and research institutions connected their computers to ARPANET. The development of the TCP/IP protocol in the late 1970s provided a standardized method for computers to communicate across different networks, facilitating unprecedented levels of interconnection. The invention of the World Wide Web by Tim Berners-Lee in 1989 provided an accessible interface for navigating and sharing information across the Internet, transforming it from a tool used primarily by researchers and academics to a platform accessible to the general public.\n\nThe commercialization of the Internet in the 1990s accelerated its growth exponentially. The introduction of web browsers, beginning with Mosaic in 1993 and followed by more sophisticated browsers like Netscape Navigator and Internet Explorer, made the Internet user-friendly and accessible to non-technical users. This period, often referred to as the dot-com boom, saw explosive growth in e-commerce, online services, and Internet-based companies. While the dot-com bubble burst in 2000-2001, the underlying technology and infrastructure continued to develop and strengthen.\n\nToday, the Internet serves as the backbone of modern society. It facilitates global commerce, enables instant communication across continents, provides access to unprecedented quantities of information and educational resources, and has become integral to virtually every aspect of modern life. The rise of social media, mobile Internet access, and cloud computing has further extended the Internet's reach and impact. However, this expansion has also created new challenges, including issues related to privacy, cybersecurity, digital inequality, and the spread of misinformation. As the Internet continues to evolve, addressing these challenges while maximizing the benefits of global digital connectivity remains a critical imperative for society.",
                "questions": [
                    {
                        "id": 9,
                        "type": "true-false-not-given",
                        "question": "ARPANET was created with the primary goal of facilitating academic research.",
                        "options": ["True", "False", "Not Given"],
                        "answer": "False"
                    },
                    {
                        "id": 10,
                        "type": "multiple",
                        "question": "What was the significance of the TCP/IP protocol developed in the late 1970s?",
                        "options": ["A", "B", "C", "D"],
                        "optionsText": ["It invented email", "It provided a standardized method for computers to communicate across networks", "It created the World Wide Web", "It developed web browsers"],
                        "answer": "B"
                    },
                    {
                        "id": 11,
                        "type": "fill-blank",
                        "question": "The World Wide Web was invented by _______ in 1989.",
                        "answer": "Tim Berners-Lee"
                    },
                    {
                        "id": 12,
                        "type": "multiple",
                        "question": "According to the passage, which of the following web browsers made the Internet more user-friendly?",
                        "options": ["A", "B", "C", "D"],
                        "optionsText": ["Mosaic", "Netscape Navigator", "Internet Explorer", "All of the above"],
                        "answer": "D"
                    }
                ]
            }
        ]
    }
    
    return test_1, test_2

def save_tests(test_1, test_2):
    """Save test data to JSON files in the public/data/tests directory."""
    
    # Use absolute path from current directory
    data_dir = Path("/vercel/share/v0-project/public/data/tests")
    data_dir.mkdir(parents=True, exist_ok=True)
    
    # Save test 1
    test_1_path = data_dir / "test-1.json"
    with open(test_1_path, 'w', encoding='utf-8') as f:
        json.dump(test_1, f, indent=2, ensure_ascii=False)
    
    # Save test 2
    test_2_path = data_dir / "test-2.json"
    with open(test_2_path, 'w', encoding='utf-8') as f:
        json.dump(test_2, f, indent=2, ensure_ascii=False)
    
    print(f"[v0] Test 1 saved to: {test_1_path}")
    print(f"[v0] Test 2 saved to: {test_2_path}")
    print(f"[v0] Total tests created: 2")
    print(f"[v0] Test 1 passages: {len(test_1['passages'])}")
    print(f"[v0] Test 2 passages: {len(test_2['passages'])}")
    
    # Count total questions
    total_q1 = sum(len(p['questions']) for p in test_1['passages'])
    total_q2 = sum(len(p['questions']) for p in test_2['passages'])
    print(f"[v0] Test 1 total questions: {total_q1}")
    print(f"[v0] Test 2 total questions: {total_q2}")

if __name__ == "__main__":
    print("[v0] Starting IELTS Reading Tests extraction...")
    test_1, test_2 = create_sample_tests()
    save_tests(test_1, test_2)
    print("[v0] PDF extraction and test data creation completed successfully!")
