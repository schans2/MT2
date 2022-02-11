# Music & Tech 2 Project Blog - Sam Schantz

## Playing Around (2/11/22)
Well, I've finally started getting my hands dirty with [WadJS](https://www.npmjs.com/package/web-audio-daw) and I think I'm gonna stick with it. It seems pretty intuitive to pass values around from the interface to it, especially thanks to technologies like jQuery. What I have is pretty barebones so far, but it was an important step to get the module installed and get a basic grasp of its syntax and methods. Regarding said methods, though, there's still so much more I have yet to try that I'm looking forward to messing with outside of basic oscillators, such as playing WAV files, adding real-time audio effects, and testing recording capabilities. There's a good chance that what I'm tinkering with right now won't directly be used in the final implementation of this project and, as such, I've sectioned it off to its own branch called `wad-playground`.
I also created `structural-logistics` to serve as a place where I can start working on shaping interface elements. Yes, I know it was discussed in class that the audio comes before the visual, however I believe them to be fairly equally important in the context of web technologies, as interface elements are still responsible for transmitting data. The idea is that facets of the data transmission process can be set up here, then the WadJS API can be incorporated into this structure. This is a workflow I feel fairly confident about after getting to experience how simple and modular the API really is. Also, this gives me a segment of tasks to work towards when I am in settings where I cannot test audio.

## Supporting Research (1/31/22)
After querying the International Computer Music Association's research database to find relevant supporting literature for this project, I believe the following three sources can be informative:
- If mobile compatibility ends up making it into the scope of this project, [this paper](https://quod.lib.umich.edu/i/icmc/bbp2372.2011.086/1/--control-software-for-end-user-interface-programming?page=root;rgn=full+text;size=150;view=text) should prove quite helpful. It goes over a mobile application designed to send OSC messages through an interface that can be designed as fit using web technologies I am already familiar with.
- [This paper](https://quod.lib.umich.edu/i/icmc/bbp2372.2012.059/1/--real-time-web-technologies-in-the-networked-performance?page=root;rgn=full+text;size=150;view=text) should be more informative in a general sense for the type of project I am planning on making, as it goes over how some of the technologies I am interested in can be utilized.
- Finally, more information on some of the extended functionality of the Web Audio API can be found [here](https://quod.lib.umich.edu/i/icmc/bbp2372.2018.021/1/--audioworklet-the-future-of-web-audio?page=root;rgn=full+text;size=150;view=image). This could potentially prove useful if I end up electing to go with the direct Web Audio API (as opposed to some sort of NPM module abstraction of it) and wish to implement flashier features, such as multithreading for better performance with multiple "instruments".

## More Thinking About Technologies & UI/UX (1/27/22)
I am now quite interested in using [this NPM module](https://www.npmjs.com/package/web-audio-daw) for the sort of web instrument / DAW I want to make. My goal with this project is to implement as many DAW-like features as I can in the time I have on top of multiple playable or sequenceable virtual instruments. As such, I think this module will take a lot of the legwork out of implementing features I was worried about being complex, such as recording. Other notable links I want to put here are things that the module's page recommends for extended functionality, such as [these impulse responses for reverb](https://www.voxengo.com/impulses/) and [Tuna](https://github.com/Theodeus/tuna/wiki#the-nodes), a Web Audio effects library. Also here's some [Web Audio API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API), because why not?

_____

Regarding user interface, I am thinking about having the sequencing GUI resemble [Google Song Maker](https://musiclab.chromeexperiments.com/Song-Maker/), where you can click or touch the screen to input notes / drum patterns. Differences over this specifically I want to implement include having the grid to support up to 32nd notes, having some kind of triplet support, and having alternate time signature support (at least 3/4, 4/4, and 5/4, since you can extrapolate a good amount from these, but hopefully more uncommon ones too). As for the general "vibe" of the GUI, I am planning on going with the same black and rainbow aesthetic as my Music & Tech 1 final project, pictured. ![The Instant Dance Party](/assets/blog/ScreenshotIDP.png "The Instant Dance Party")

## About (1/13/22)
This blog is for a class I am currently taking: Music and Technology II. I hope it will fully and accurately convey whatever the timeline ends up being for this project's formation. For now, though, the creation of this blog certainly is a first step in that direction. As for project ideas, right now I'm thinking that I want to build a web-interface instrument of some kind. The term "instrument" might be just a bit disingenuous, though, as I'm imagining something you could play a full, multi-faceted song on. Going forward, I'll be thinking a lot about what sort of control sceme I should set up. Should the user perhaps be able to pre-program some kind of sequence for a bass and drum pattern and then play the lead, for instance? Or should there be multiple, simultaneously controllable timbres for the user? These are the kinds of things I'll be thinking about going forward.