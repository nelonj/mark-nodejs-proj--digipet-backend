import express from "express";
import cors from "cors";
import { getDigipet } from "./digipet/model";
import { feedDigipet, hatchDigipet, ignoreDigipet, trainDigipet, walkDigipet, rehomeDigipet } from "./digipet/controller";

const app = express();

/**
 * Simplest way to connect a front-end. Unimportant detail right now, although you can read more: https://flaviocopes.com/express-cors/
 */
app.use(cors());




app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Digipet, the totally original digital pet game! Keep your pet happy, healthy and well-disciplined to win the game. If in doubt, check out the /instructions endpoint!",
  });
});






app.get("/instructions", (req, res) => {
  res.json({
    message:
      "You can check out your digipet's stats with /digipet, and add various actions after that with the /digipet/[action], for actions like walk, train, feed, ignore and hatch. For example, try /digipet/walk to walk a digipet!",
  });
});

app.get("/digipet", (req, res) => {
  const digipet = getDigipet();
  if (digipet) {
    res.json({
      message: "Your digipet is waiting for you!",
      digipet, // equivalent to digipet: digipet
    });
  } else {
    res.json({
      message: "You don't have a digipet yet! Try hatching one with /hatch",
      digipet: undefined,
    });
  }
});

app.get("/digipet/hatch", (req, res) => {
  const digipet = getDigipet(); // checks whether userDigipet has been assigned a value
  if (digipet) {
    res.json({
      message: "You can't hatch a digipet now because you already have one!",
      digipet,
    });
  } else {
    const digipet = hatchDigipet(); // return copy of the frozen template + set userDigipet to said copy
    res.json({
      message:
        "You have successfully hatched an adorable new digipet. Just the cutest.",
      digipet,
    });
  }
});
 //res: an object for creating/sending responses, but NOT a response itself
app.get("/digipet/walk", (req, res) => { //a ROUTE HANDLER: called whenever endpoint clicked
  // check the user has a digipet to walk
  if (getDigipet()) {
    walkDigipet();
    res.json({ //an express method that creates an HTTP response
      message: "You walked your digipet. It looks happier now!",
      digipet: getDigipet(), // my userDigipet because getDigipet will be returning the digipet interface (and NOT null)
    });
  } else {  //not all of its methods send something back: need to explicitly call one of them
    res.json({
      message:
        "You don't have a digipet to walk! Try hatching one with /digipet/hatch",
    });
  }
});

app.get("/digipet/train", (req, res) => { //Tests past with just lines 77-80 (no test built for if/else)
  if (getDigipet()) {
    trainDigipet();
    res.json({
      message: "You have trained your digipet",
      digipet: getDigipet(),
    })
  } else {
    res.json({
      message:
        "You don't have a digipet to train! Try hatching one with /digipet/hatch",
    });
  }
});

app.get("/digipet/feed", (req, res) => {
  
  if (getDigipet()){
  feedDigipet();
  res.json(
    {
      message: "You have been feeding your digipet.",
      digipet: getDigipet()
    }
  )}
  else {
    res.json({
      message: "You don't have a digipet. Try going  to /digipet/hatch"
    })
  }
})

app.get('/digipet/ignore', (req, res) => {
  if(getDigipet()) {
    ignoreDigipet();
    res.json({
      message: "If you ignore your digipet, it will wittle and die",
      digipet: getDigipet()
    })
  }
  else {
    res.json({
      message: "you don't have a digipet. try hatching one at /digipet/hatch"
    })
  }
})

app.get('/digipet/rehome', (req, res) => {
  rehomeDigipet();
  res.json({
    message: "Your digipet has been rehomed. You can hatch another one at /digipet/hatch"
  })
})

export default app;
