/* Containment is not a prerequisite. Each capability has one evidence record. */
window.CATALOG={
 version:3,
 systems:[
  {id:'mechanics',name:'Mechanics',color:'#b7edcf',p:[-10,-1,2],description:'Position, motion, interactions, and the quantities that stay conserved.'},
  {id:'waves',name:'Waves & Light',color:'#9bc9ea',p:[-1,6,-2],description:'Oscillations, propagation, interference, and light signals.'},
  {id:'electric',name:'Electricity & Magnetism',color:'#b6b0e4',p:[10,5,-3],description:'Charge, fields, circuits, and electromagnetic interactions.'},
  {id:'thermal',name:'Thermal Physics',color:'#e6ac8c',p:[11,-5,1],description:'Temperature, energy transfer, and thermal processes.'},
  {id:'quantum',name:'Quantum Physics',color:'#b8c9eb',p:[0,-7,3],description:'Photons, atomic energy, and quantum behavior.'},
  {id:'relativity',name:'Spacetime & Relativity',color:'#d1bbe6',p:[-10,8,-4],description:'Events, observers, clock comparisons, and gravity as geometry.'}
 ],
 planets:[
  {id:'measurement',name:'Measurement',system:'mechanics',skills:['position','displacement','interval'],shared:true,description:'Locate an object, describe a route, and measure an interval.'},
  {id:'motion',name:'Motion',system:'mechanics',skills:['speed','acceleration'],description:'Describe motion before explaining its causes.'},
  {id:'force',name:'Forces',system:'mechanics',skills:['net','newton'],description:'Combine interactions and predict changes in motion.'},
  {id:'gravity',name:'Gravity & Orbits',system:'mechanics',skills:['weight','fall','attraction'],description:'Weight, ideal free fall, and gravitational interactions. Orbital activities are not built yet.'},
  {id:'energy',name:'Energy',system:'mechanics',skills:[],topics:['Work & power','Kinetic & potential energy','Conservation'],description:'Account for transfers and transformations within a system.'},
  {id:'momentum',name:'Momentum',system:'mechanics',skills:[],topics:['Impulse','Collisions','Conservation'],description:'Reason about interacting systems and collisions.'},
  {id:'oscillation',name:'Oscillation',system:'waves',skills:['frequency'],description:'Relate repeating events to elapsed time.'},
  {id:'wave-behavior',name:'Wave Behavior',system:'waves',skills:[],topics:['Propagation','Superposition','Interference'],description:'Describe the movement and interaction of disturbances.'},
  {id:'sound',name:'Sound',system:'waves',skills:[],topics:['Resonance','Doppler effect','Standing waves'],description:'Connect vibrations, pressure disturbances, and hearing.'},
  {id:'light',name:'Light Signals',system:'waves',skills:['lighttime'],shared:true,description:'Distinguish an event from the arrival of its light signal.'},
  {id:'optics',name:'Optics',system:'waves',skills:[],topics:['Reflection','Refraction','Images'],description:'Predict how light travels through optical systems.'},
  {id:'charge',name:'Charge & Fields',system:'electric',skills:[],topics:['Electric charge','Electric force','Fields'],description:'Represent electric interactions.'},
  {id:'circuits',name:'Circuits',system:'electric',skills:[],topics:['Current & voltage','Resistance','Circuit power'],description:'Build and reason about electrical paths.'},
  {id:'magnetism',name:'Magnetism',system:'electric',skills:[],topics:['Magnetic fields','Magnetic force'],description:'Describe magnetic interactions.'},
  {id:'induction',name:'Induction',system:'electric',skills:[],topics:['Changing flux','Motors & generators'],description:'Connect changing magnetic fields and electric effects.'},
  {id:'temperature',name:'Temperature',system:'thermal',skills:[],topics:['Particle motion','Temperature & energy'],description:'Distinguish a temperature from an amount of thermal energy.'},
  {id:'heat',name:'Energy Transfer',system:'thermal',skills:[],topics:['Conduction','Convection','Radiation'],description:'Investigate thermal energy transfer.'},
  {id:'equilibrium',name:'Equilibrium',system:'thermal',skills:[],topics:['Thermal contact','Energy accounting'],description:'Predict the effects of thermal contact.'},
  {id:'thermodynamics',name:'Thermodynamics',system:'thermal',skills:[],topics:['Thermal processes','Entropy'],description:'Explore constraints on thermal processes.'},
  {id:'photons',name:'Photons',system:'quantum',skills:[],topics:['Quantized energy','Photoelectric effect'],description:'Compare particle and wave predictions for light.'},
  {id:'atoms',name:'Atomic Energy',system:'quantum',skills:[],topics:['Energy levels','Spectra'],description:'Connect atomic energy changes with emitted light.'},
  {id:'duality',name:'Wave & Particle',system:'quantum',skills:[],topics:['Interference','Measurement'],description:'Explore the limits of classical descriptions.'},
  {id:'quantum-states',name:'Quantum States',system:'quantum',skills:[],topics:['Superposition','Uncertainty'],description:'Build an introduction to quantum descriptions.'},
  {id:'events',name:'Events & Spacetime',system:'relativity',skills:['events'],description:'Assign a place and a time to each event in one chosen reference frame.'},
  {id:'frames',name:'Reference Frames',system:'relativity',skills:[],topics:['Observers','Coordinates','Relative motion'],description:'Separate an event from its description by an observer.'},
  {id:'clocks',name:'Clock Comparisons',system:'relativity',skills:[],topics:['Synchronization','Simultaneity','Time dilation'],description:'Compare clocks and distinguish propagation delay from relativistic effects.'},
  {id:'rel-motion',name:'Relativistic Motion',system:'relativity',skills:[],topics:['Lorentz transformations','Causal limits'],description:'Develop predictions consistent with special relativity.'},
  {id:'curvature',name:'Gravity & Curvature',system:'relativity',skills:[],topics:['Equivalence','Tidal effects','Curved spacetime'],description:'Connect gravity with spacetime geometry.'}
 ],
 prerequisites:{position:[],displacement:['position'],interval:['position'],speed:['displacement','interval'],acceleration:['speed'],net:['acceleration'],newton:['net'],weight:['newton'],fall:['newton','interval'],attraction:['weight','displacement'],frequency:['interval'],lighttime:['speed'],events:['displacement','interval']},
 order:['position','displacement','interval','speed','acceleration','net','newton','weight','fall','attraction','frequency','lighttime','events'],
 missions:[
  {id:'drop-timer',name:'Drop timer',description:'Measure an interval, then predict when two falling masses reach a switch.',skills:['interval','fall'],requirements:['newton'],systems:['mechanics']},
  {id:'signal-relay',name:'Signal relay',description:'Predict a light-signal delay, then locate the events in space and time.',skills:['lighttime','events'],requirements:['speed'],systems:['waves','relativity']}
 ]
};
