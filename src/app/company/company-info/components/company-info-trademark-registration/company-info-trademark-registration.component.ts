import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../company.service';
import { FormGroup, FormControl, Form } from '@angular/forms';
import { CompanyInfo } from '../../../../shared/class/company-info';
import { TrademarkRegistration } from '../../../../shared/class/trademark-registration';
import { AddressCountry, AddressState } from '../../../../shared/class/address';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'o-company-info-trademark-registration',
  templateUrl: './company-info-trademark-registration.component.html'
})

export class CompanyInfoTrademarkRegistrationComponent implements OnInit {
    errorMessage: string;
    companyInfo: CompanyInfo;
    formDirty: boolean;
    trademark: TrademarkRegistration;

    selectedClasses: any[];

    selectedFileNames: string[] = [];
    filesToUpload: Array<File> = [];

    trademarkRegistrationForm: FormGroup;
    
    loading: boolean;
    showForm: boolean;
    showFormSuccess: boolean;
    classList: any[];

    constructor(private route: ActivatedRoute,
        private companyService: CompanyService,
        private translate: TranslateService) { }

    ngOnInit(): void {
        this.showForm = true;
        this.showFormSuccess = false;
        this.selectedClasses = [];
        this.trademark = new TrademarkRegistration('1', '', '', '', true, new Date('1/1/2019'), new Date('1/1/2019'));
        this.addClassSelectInput();

        this.classList = [
            {
                Value: 'Class 6',
                Name: 'Class 6',
                Description: 'Common metals and their alloys, metal building materials, transportable buildings of metal, materials of metal for railway tracks, non-electric cables and wires of common metal, ironmongery, small items of metal hardware, pipes and tubes of metal, safes, goods of common metal not included in other classes, ores.',
                Note: 'Class 6 includes mainly unwrought and partly wrought common metals as well as simple products made of them. This Class does not include, in particular: bauxite (Cl. 1),  mercury, antimony, alkaline and alkaline-earth metals (Cl. 1), metals in foil and powder form for painters, decorators, printers and artists (Cl. 2).'
            },
            {
                Value: 'Class 7',
                Name: 'Class 7',
                Description: 'Machines and machine tools, motors and engines (except for land vehicles), machine coupling and transmission components (except for land vehicles), agricultural implements other than hand-operated, incubators for eggs.',
                Note: 'Class 7 includes mainly machines, machine tools, motors and engines. This Class includes, in particular: parts of motors and engines (of all kinds), electric cleaning machines and apparatus. This Class does not include, in particular: certain special machines and machine tools (consult the Alphabetical List of Goods), hand tools and implemenmts, hand-operated (Cl. 8), motors and engines for land vehicles (Cl. 12).'
            },
            {
                Value: 'Class 8',
                Name: 'Class 8',
                Description: 'Hand tools and implements (hand-operated), cutlery, side arms, razors.',
                Note: 'Class 8 includes mainly hand-operated implements used as tools in the respective professions. This Class includes, in particular: cutlery of precious metals, electric razors and clippers (hand instruments). This Class does not include, in particular:  certain special instruments (consult the Alphabetical List of Goods), machine tools and implements driven by a motor (Cl. 7), surgical cutlery (Cl. 10), paper knives (Cl. 16), fencing weapons (Cl. 28).'
            },
            {
                Value: 'Class 9',
                Name: 'Class 9',
                Description: 'Scientific, nautical, surveying, photographic, cinematographic, optical, weighing, measuring, signalling, checking (supervision), life-saving and teaching apparatus and instruments; apparatus and instruments for conducting, switching, transforming, accumulating, regulating or controlling electricity, apparatus for recording, transmission or reproduction of sound or images, magnetic data carriers, recording discs, automatic vending machines and mechanisms for coin-operated apparatus, cash registers, calculating machines, data processing equipment and computers, fire-extinguishing apparatus.',
                Note: 'This Class includes, in particular: apparatus and instruments for scientific research in laboratories, apparatus and instruments for controlling ships, such as apparatus and instruments, for measuring and for transmitting orders. The following electrical apparatus and instruments: (a) certain electrothermic tools and apparatus, such as electric soldering irons, electric flat irons which, if they were not electric, would belong to Class 8, (b) apparatus and devices which, if not electrical, would be listed in various classes, i.e., electrically heated clothing, cigar-lighters for automobiles, protractors, punched card office machines, amusement apparatus adapted for use with television receivers only, all computer programs and software regardless of recording media or means of dissemination, that is, software recorded on magnetic media or downloaded from a remote computer network. This Class does not include, in particular: the following electrical apparatus and instruments: (a) electromechanical apparatus for the kitchen (grinders and mixers for foodstuffs, fruit presses, electrical coffee mills, etc.), and certain other apparatus and instruments driven by an electrical motor, all coming under Class 7; (b) electric razors and clippers (hand instruments) (Cl. 8); (c) electric toothbrushes and combs (Cl. 21); (d) electrical apparatus for space heating or for the heating of liquids, for cooking, ventilating, etc. (Cl. 11), clocks and watches and other chronometric instruments (Cl. 14), control clock (Cl. 14).'
            },
            {
                Value: 'Class 10',
                Name: 'Class 10',
                Description: 'Surgical, medical, dental and veterinary apparatus and instruments, artificial limbs, eyes and teeth; orthopedic articles; suture materials.',
                Note: 'Class 10 includes mainly medical apparatus, instruments and articles. This Class includes, in particular: special furniture for medical use; hygienic rubber articles (consult the Alphabetical List of Goods); supportive bandages.'
            },
            {
                Value: 'Class 11',
                Name: 'Class 11',
                Description: 'Apparatus for lighting, heating, steam generating, cooking, refrigerating, drying, ventilating, water supply and sanitary purposes.',
                Note: 'This Class includes, in particular: air conditioning apparatus; bedwarmers, hot water bottles, warming pans, electric or non-electric; electrically heated cushions (pads) and blankets, not for medical purposes; electric kettles; electric cooking utensils. This Class does not include, in particular: steam producing apparatus (parts of machines) (Cl. 7); electrically heated clothing (Cl. 9).'
            },
            {
                Value: 'Class 12',
                Name: 'Class 12',
                Description: 'Vehicles; apparatus for locomotion by land, air or water.',
                Note: 'This Class includes, in particular: motors and engines for land vehicles; couplings and transmission components for land vehicles; air cushion vehicles. This Class does not include, in particular: certain parts of vehicles (consult the Alphabetical List of Goods); railway material of metal (Cl. 6); motors, engines, couplings and transmission components other than for land vehicles (Cl. 7); parts of motors and engines (of all kinds) (Cl. 7).'
            },
            {
                Value: 'Class 13',
                Name: 'Class 13',
                Description: 'Firearms; ammunition and projectiles; explosives; fireworks.',
                Note: 'Class 13 includes mainly firearms and pyrotechnical products. This Class does not include, in particular: matches (Cl. 34).'
            },
            {
                Value: 'Class 14',
                Name: 'Class 14',
                Description: 'Precious metals and their alloys and goods in precious metals or coated therewith, not included in other classes; jewellery, precious stones; horological and chronometric instruments.',
                Note: 'Class 14 includes mainly precious metals, goods in precious metals and, in general jewellery, clocks and watches. This Class includes, in particular: jewellery (i.e., imitation jewellery and jewellery of precious metal and stones); cuff links, tie pins. This Class does not include, in particular: certain goods in precious metals (classified according to their function or purpose), for example, metals in foil and powder form for painters, decorators, printers and artists (Cl. 2), amalgam of gold for dentists (Cl. 5), cutlery (Cl. 8), electric contacts (Cl. 9), pen nibs of gold (Cl. 16); objects of art not of precious metals (classified according to the material of which they consist).'
            },
            {
                Value: 'Class 15',
                Name: 'Class 15',
                Description: 'Musical instruments.',
                Note: 'This Class includes, in particular: mechanical pianos and their accessories; musical boxes; electrical and electronic musical instruments. This Class does not include, in particular: apparatus for the recording, transmission, amplification and reproduction of sound (Cl. 9).' 
            },
            {
                Value: 'Class 16',
                Name: 'Class 16',
                Description: 'Paper, cardboard and goods made from these materials, not included in other classes; printed matter; bookbinding material; photographs; stationery; adhesives for stationery or household purposes; artists\' materials; paint brushes; typewriters and office requisites (except furniture);  instructional and teaching material (except apparatus); plastic materials for packaging (not included in other classes); printers\' type; printing blocks.',
                Note: 'Class 16 includes mainly paper, goods made from that material and office requisites. This Class includes, in particular: paper knives; duplicators; plastic sheets, sacks and bags for wrapping and packaging. This Class does not include, in particular: certain goods made of paper and cardboard (consult the Alphabetical List of Goods); colours (Cl. 2); hand tools for artists (for example, spatulas, sculptors” chisels) (Cl. 8).'
            },
            {
                Value: 'Class 17',
                Name: 'Class 17',
                Description: 'Rubber, gutta-percha, gum, asbestos, mica and goods made from these materials and not included in other classes; plastics in extruded form for use in manufacture; packing, stopping and insulating materials; flexible pipes, not of metal.',
                Note: 'Class 17 includes mainly electrical, thermal and acoustic insulating materials and plastics, being for use in manufacture in the form of sheets, blocks and rods. This Class includes, in particular: rubber material for recapping tyres; padding and stuffing materials of rubber or plastics; floating anti-pollution barriers.'
            },
            {
                Value: 'Class 18',
                Name: 'Class 18',
                Description: 'Leather and imitations of leather, and goods made of these materials and not included in other classes; animal skins, hides; trunks and travelling bags; umbrellas, parasols and walking sticks; whips, harness and saddlery.',
                Note: 'Class 18 includes mainly leather, leather imitations, travel goods not included in other classes and saddlery. This Class does not include, in particular: clothing, footwear, headgear (consult the Alphabetical List of Goods).'
            },
            {
                Value: 'Class 19',
                Name: 'Class 19',
                Description: 'Building materials (non-metallic); non-metallic rigid pipes for building; asphalt, pitch and bitumen; non-metallic transportable buildings; monuments, not of metal.',
                Note: 'Class 19 includes mainly non-metallic building materials. This Class includes, in particular: semi-worked woods (for example: beams, planks, panels); veneers; building glass (for example, floor slabs, glass tiles); glass granules for marking out roads; letter boxes of masonry. This Class does not include, in particular: cement preservatives and cement-waterproofing preparations (Cl. 1); fireproofing preparations (Cl. 1).'
            },
            {
                Value: 'Class 20',
                Name: 'Class 20',
                Description: 'Furniture, mirrors, picture frames; goods (not included in other classes) of wood, cork, reed, cane, wicker, horn, bone, ivory, whalebone, shell, amber, mother-of-pearl, meerschaum and substitutes for all these materials, or of plastics.',
                Note: 'Class 20 includes mainly furniture and its parts and plastic goods, not included in other classes. This Class includes, in particular: metal furniture and furniture for camping; bedding (for example: mattresses, spring mattresses, pillows); looking glasses and furnishing or toilet mirrors; registration number plates not of metal; letter boxes not of metal or masonry. This Class does not include, in particular: certain special types of mirrors, classified according to their function or purpose (consult the Alphabetical List of Goods); special furniture for laboratories (Cl. 9); special furniture for medical use (Cl. 10); bedding linen (Cl. 24); eiderdowns (Cl. 24).'
            },
            {
                Value: 'Class 21',
                Name: 'Class 21',
                Description: 'Household or kitchen utensils and containers (not of precious metal or coated therewith); combs and sponges; brushes (except paint brushes); brush-making materials; articles for cleaning purposes; steelwool; unworked or semi-worked glass (except glass used in building); glassware, porcelain and earthenware not included in other classes.',
                Note: 'Class 21 includes mainly small, hand-operated utensils and apparatus for household and kitchen use as well as toilet utensils, glassware and articles in porcelain. This Class includes, in particular: utensils and containers for household and kitchen use, for example, kitchen utensils, pails, pans of iron, of aluminium, of plastics or of other materials, small hand-operated apparatus for mincing, grinding, pressing, etc.; candle extinguishers, not of precious metal; electric combs; electric toothbrushes; dish stands and decanter stands. This Class does not include, in particular: certain goods made of glass, porcelain and earthenware (consult the Alphabetical List of Goods);  cleaning preparations, soaps, etc. (Cl. 3); small apparatus for mincing, grinding, pressing, etc., driven by electricity (Cl. 7); razors and shaving apparatus, clippers (hand instruments), metal implements and utensils for manicure and pedicure (Cl. 8); cooking utensils, electric (Cl. 11); toilet mirrors (Cl. 20).'
            },
            {
                Value: 'Class 22',
                Name: 'Class 22',
                Description: 'Ropes, string, nets, tents, awnings, tarpaulins, sails, sacks and bags (not included in other classes); padding and stuffing materials (except of rubber or plastics); raw fibrous textile materials.',
                Note: 'Class 22 includes mainly rope and sail manufacture products, padding and stuffing materials and raw fibrous textile materials. This Class includes, in particular: cords and twines in natural or artificial textile fibres, paper or plastics. This Class does not include, in particular: certain nets, sacks and bags (consult the Alphabetical List of Goods); strings for musical instruments (Cl. 15).'
            },
            {
                Value: 'Class 23',
                Name: 'Class 23',
                Description: 'Yarns and threads, for textile use',
                Note: ''
            },
            {
                Value: 'Class 24',
                Name: 'Class 24',
                Description: 'Textiles and textile goods, not included in other classes; bed and table covers.',
                Note: 'Class 24 includes mainly textiles (piece goods) and textile covers for household use. This Class includes, in particular: bedding linen of paper. This Class does not include, in particular: certain special textiles (consult the Alphabetical List of Goods); electrically heated blankets, for medical purposes (Cl. 10) and not for medical purposes (Cl. 11); table linen of paper (Cl. 16); horse blankets (Cl. 18).'
            },
            {
                Value: 'Class 25',
                Name: 'Class 25',
                Description: 'Clothing, footwear, headgear.',
                Note: 'This Class does not include, in particular: certain clothing and footwear for special use (consult the Alphabetical List of Goods).'
            },
            {
                Value: 'Class 26',
                Name: 'Class 26',
                Description: 'Lace and embroidery, ribbons and braid; buttons, hooks and eyes, pins and needles; artificial flowers.',
                Note: 'Class 26 includes mainly dressmakers\' articles. This Class includes, in particular: slide fasteners. This Class does not include, in particular: certain special types of hooks (consult the Alphabetical List of Goods); certain special types of needles (consult the Alphabetical List of Goods); yarns and threads for textile use (Cl. 23).'
            },
            {
                Value: 'Class 27',
                Name: 'Class 27',
                Description: 'Carpets, rugs, mats and matting, linoleum and other materials for covering existing floors; wall hangings (non-textile).',
                Note: 'Class 27 includes mainly products intended to be added as furnishings to previously constructed floors and walls.'
            },
        ]

        // this.companyService.getAddressCountry().subscribe(
        //     (addresscountries: AddressCountry[]) => {
        //         this.addressCountries = addresscountries;
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );
    }
    
    addClassSelectInput(): void {
        this.selectedClasses.push({});
    }
    removeClassSelectInput(index):void {
        this.selectedClasses.splice(index, 1);
    }

    fileChangeEvent(fileInput: any) {
        // Clear Uploaded Files result message
        this.filesToUpload = <Array<File>>fileInput.target.files;

        for (let i = 0; i < this.filesToUpload.length; i++) {
            this.selectedFileNames.push(this.filesToUpload[i].name);
        }
    }
    // submitTrademarkRegistration() {
    //     if(this.isTrademarkRegistrationValid()) {
    //         this.companyService.sendNotification({ type: 'success', title: 'Successfully Registered', content: "Trademark registration has been saved." }); 
    //         this.companyService.editCompanyInfoShippingAddress(this.companyInfo).subscribe(
    //             () => {
    //                 this.companyService.sendNotification({ type: 'success', title: 'Successfully Updated', content: "Shipping address has been updated" }); 
    //             },
    //             (error: any) => {
    //                 this.companyService.sendNotification({ type: 'error', title: 'Error', content: <any>error });
    //             }
    //         );
    //     }
    // }

    isTrademarkRegistrationValid(): boolean {
        if (this.trademark
            && this.trademark.Type
            && this.trademark.TrademarkRegistrationName
            && this.trademark.Logo
            && this.trademark.TrademarkActive
            && this.trademark.Date1
            && this.trademark.Date2) {
            return true;
        }
        else {
            this.companyService.sendNotification({ type: 'error', title: 'Error', content: 'Please enter all required fields' });
            return false;
        }
    }
    clearFields() {
        const confirmation = confirm(`Are you sure you want to clear this Trademark Registration Form?`);
        if (confirmation) window.location.reload(); 
    }
    submitForm() {
        this.loading = true;
        setTimeout(()=> {
            this.showFormSuccess = true;
            this.showForm = false;
            this.loading = false;
            this.companyService.sendNotification({ type: 'success', title: 'Successfully Registered', content: "Trademark registration has been saved." }); 
        }, 1000)
    }
}
