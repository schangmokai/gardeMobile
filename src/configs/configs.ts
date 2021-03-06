export const maconfig = {
	'socketadresse': 'http://localhost:3000',
	'findChauffeurByCodeVehicule': 'http://localhost:8085/api/findChauffeurByCodeVehicule',
    'logins':'http://localhost:8085/api/utilisateurs/logins',
    'insertposition': 'http://localhost:8085/api/insertposition',
    'saveClientVehicule':'http://localhost:8085/api/saveClientVehicule',
    'signalerdanger':'http://localhost:8085/api/utilisateurs/signalerdanger',
    'findClientByVehicule':'http://localhost:8085/api/findClientByVehicule',
    'listesUserEnDanger':'http://localhost:8085/api/utilisateurs/listesUserEnDanger',
    'imagesUsers':'http://localhost/Garde/Images/',
    'Imagechauffeur':'http://localhost/Garde/ImageChauffeur/',
    'imagesVehicule':'http://localhost/Garde/ImagesVehicule/',
    'findAllClientByVehiculeId': 'http://localhost:8085/api/findAllClientByVehiculeId'
}
export const Languages = [
    {value:"fr", name:"francais"},
    {value:"en", name:"anglais"}
];
export var LANG:any = {
    value:"fr"
};
export var TimerCounter:any = {
    value:5,
    timer:null
}
export const NotificationDelai = [
        { value:2, name:"2 minutes", default:0},
        { value:5, name:"5 minutes", default:1},
        { value:10, name:"10 minutes", default:0},
        { value:15, name:"15 minutes", default:0},
        { value:20, name:"20 minutes", default:0},
        { value:25, name:"25 minutes", default:0}
];
export var Session:any = {
    user:null,
    toke:null
}