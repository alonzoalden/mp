export class VendorFactoryTour {
    constructor(
        public VendorFactoryTourID: string,
        public VendorID: string,
        public CompanyName: string,
        public Description: string,
        public Country: string,
        public YearEstablished: string,
        public RecentTransaction: string,
        public BusinessType: string,
        public MainProduct: string,
        public TotalAnnualRevenue: string,
        public RegisteredAddress: string,
        public IncorporationDate: string,
        public LegalForm: string,
        public CompanyStatus: string,
        public RegistrationNumber: string,
        public AuthorizedCapital: string,
        public LegalRepresentatives: string,
        public ImportExportLicencesObtained: string,
        public BusinessPermitExpiry: string,
        public BusinessScope: string,
        public RegistrationAgency: string,
        public VendorImages: VendorImage[],
        public Banner: string,
        public Approval: string
    ) {
    }
}

export class VendorImage {
    constructor(
        public VendorImageID?: string,
        public Title?: string,
        public Path?: string
    ) {
    }
}

export class VendorDevelopment {
    constructor(
        public VendorDevelopmentID: string,
        public VendorID: string,
        public Description: string,
        public RDStaff: string,
        public MachineryEquipmentRD: string,
        public PatentsCopyrights: string,
        public AwardsOtherRecognitions: string,
        public Locations: string,
        public Profile: string,
        public VendorImages: VendorImage[],
        public Approval: string
    ) {
    }
}

export class VendorOM {
    constructor(
        public VendorOMID: string,
        public VendorID: string,
        public Description: string,
        public ProductLines: string,
        public FactorySizeMeters: string,
        public FactorySizeFeet: string,
        public StaffDetails: string,
        public YearsExperience: string,
        public DesignServicesOffered: string,
        public DetailDesignServicesOffered: string,
        public BuyerLabelOffered: string,
        public DetailBuyerLabelOffered: string,
        public MaterialsComponents: string,
        public MachineryEquipment: string,
        public MonthlyCapacity: string,
        public MonthlyOutput: string,
        public MinimunOrder: string,
        public MajorMarketsServed: string,
        public VendorImages: VendorImage[],
        public Approval: string
    ) {
    }
}

export class VendorQC {
    constructor(
        public VendorQCID: string,
        public VendorID: string,
        public Description: string,
        public TechnicalSupport: string,
        public QCStaff: string,
        public CompanyCertifications: string,
        public Materials: string,
        public Procedures: string,
        public OtherInformation: string,
        public VendorImages: VendorImage[],
        public Approval: string
    ) {
    }
}

export class VendorService {
    constructor(
        public VendorServiceID: string,
        public VendorID: string,
        public Description: string,
        public Policy: string,
        public Guarantees: string,
        public Support: string,
        public AfterSalesService: string,
        public VendorImages: VendorImage[],
        public Approval: string
    ) {
    }
}

export class VendorCertificate {
    constructor(
        public VendorImages: VendorImage[]
    ) {
    }
}

export class VendorTradeShow {
    constructor(
        public VendorTradeShowID: string,
        public VendorID: string,
        public Name: string,
        public Location: string,
        public ShowDate: Date,
        public Booth: string,
        public ShowSamples: string,
        public Contact: string,
        public ImagePath: string,
        public Approval: string
    ) {
    }
}
