import { db, rightsModules, templates } from './db';

const SAMPLE_RIGHTS_MODULES = [
  {
    title: 'Security Deposit Rights',
    summary: 'Know your rights when landlords withhold security deposits',
    detailedContent: `Your security deposit is your money, and landlords cannot keep it without valid reasons. Here are your key rights:

**What landlords CAN deduct:**
- Unpaid rent
- Damage beyond normal wear and tear
- Cleaning costs if property left excessively dirty
- Agreed-upon costs in lease

**What landlords CANNOT deduct:**
- Normal wear and tear (faded paint, worn carpet)
- Pre-existing damage
- Improvements or upgrades
- Cleaning for normal use

**Your Rights:**
- Right to written itemized list of deductions
- Right to return of deposit within 30 days (varies by state)
- Right to dispute unfair deductions
- Right to photos/documentation of property condition

**Action Steps:**
1. Document property condition at move-in and move-out
2. Request written explanation for any deductions
3. Keep all receipts and communications
4. Know your state's specific timeline requirements
5. Consider small claims court for disputes over $500+

**Important:** Laws vary by state. Some states require interest on deposits, others have stricter timelines. Always check your local tenant rights laws.`,
    tags: ['tenant', 'security deposit', 'landlord', 'rental'],
    type: 'tenant',
    isPremium: false,
  },
  {
    title: 'Workplace Harassment Rights',
    summary: 'Understanding harassment laws and reporting procedures',
    detailedContent: `Workplace harassment is illegal and you have strong protections under federal and state laws.

**Types of Harassment:**
- Sexual harassment
- Harassment based on race, religion, age, disability
- Hostile work environment
- Quid pro quo harassment
- Retaliation for reporting

**Your Rights:**
- Right to work in harassment-free environment
- Right to report without retaliation
- Right to have complaints investigated
- Right to legal remedies if harassment continues

**What Constitutes Harassment:**
- Unwelcome conduct based on protected characteristics
- Conduct that creates hostile work environment
- Submission to conduct affects employment decisions
- Pattern of offensive behavior

**Reporting Steps:**
1. Document all incidents (dates, witnesses, details)
2. Report to HR or supervisor (unless they're the harasser)
3. Follow company complaint procedures
4. File EEOC complaint if internal process fails
5. Consider legal counsel for serious cases

**Protection from Retaliation:**
- Employer cannot fire, demote, or punish you for reporting
- Retaliation is separately illegal even if harassment claim fails
- Document any negative treatment after reporting

**Timeline:** EEOC complaints must be filed within 180-300 days depending on your state.`,
    tags: ['workplace', 'harassment', 'employment', 'discrimination'],
    type: 'workplace',
    isPremium: false,
  },
  {
    title: 'Return & Refund Rights',
    summary: 'Consumer protection laws for returns and refunds',
    detailedContent: `Consumer protection laws give you important rights when making purchases, both online and in stores.

**Federal Rights:**
- Right to cancel door-to-door sales within 3 days
- Right to dispute credit card charges
- Right to accurate product descriptions
- Right to receive goods as advertised

**Online Purchase Rights:**
- Right to receive items within promised timeframe
- Right to return items if significantly different from description
- Right to cancel orders before shipment
- Protection against fraudulent charges

**Store Return Policies:**
- Stores must honor their stated return policy
- "No returns" policies must be clearly posted
- Defective items can be returned regardless of policy
- Gift receipts provide return rights

**Credit Card Protections:**
- Chargeback rights for defective/undelivered goods
- Protection against unauthorized charges
- Right to dispute billing errors
- Extended warranty protections

**When You Can Always Return:**
- Item is defective or doesn't work as advertised
- Item was damaged in shipping
- Wrong item was sent
- Item poses safety hazard

**Action Steps:**
1. Keep all receipts and documentation
2. Understand store's return policy before purchasing
3. Inspect items immediately upon receipt
4. Contact merchant first for resolution
5. Use credit card dispute process if needed
6. File complaints with state consumer protection agency

**Lemon Laws:** Special protections exist for defective vehicles - you may be entitled to replacement or refund.`,
    tags: ['consumer', 'returns', 'refunds', 'shopping'],
    type: 'consumer',
    isPremium: false,
  },
  {
    title: 'Wage and Hour Rights',
    summary: 'Know your rights regarding pay, overtime, and work hours',
    detailedContent: `The Fair Labor Standards Act (FLSA) provides important protections for workers regarding wages and hours.

**Minimum Wage Rights:**
- Federal minimum wage applies to most workers
- Some states have higher minimum wages
- Tipped workers have special minimum wage rules
- Employers must pay the higher of federal or state minimum

**Overtime Rights:**
- Time-and-a-half pay for hours over 40 per week
- Applies to non-exempt employees
- Cannot be waived by agreement
- Comp time may be allowed for government employees only

**Break and Meal Period Rights:**
- Federal law doesn't require breaks for adults
- Many states require meal and rest breaks
- Breaks under 20 minutes must be paid
- Meal breaks over 30 minutes can be unpaid if truly free

**Pay Stub Rights:**
- Right to receive pay stub showing deductions
- Right to know your pay rate and classification
- Right to see overtime calculations
- Right to records of hours worked

**Common Violations:**
- Misclassifying employees as exempt from overtime
- Not paying for all hours worked
- Illegal deductions from pay
- Not paying minimum wage
- Requiring work during unpaid breaks

**What to Do:**
1. Keep detailed records of hours worked
2. Save all pay stubs and time records
3. Know your state's specific laws
4. File complaint with Department of Labor
5. Consider legal action for significant violations

**Exempt vs. Non-Exempt:**
- Exempt employees don't get overtime (salary, executive, professional)
- Non-exempt employees must receive overtime pay
- Job title doesn't determine classification - duties do`,
    tags: ['workplace', 'wages', 'overtime', 'employment'],
    type: 'workplace',
    isPremium: true,
  },
];

const SAMPLE_TEMPLATES = [
  {
    title: 'Security Deposit Demand Letter',
    body: `[Your Name]
[Your Address]
[City, State, ZIP Code]
[Your Phone Number]
[Your Email]

[Date]

[Landlord's Name]
[Landlord's Address]
[City, State, ZIP Code]

RE: Demand for Return of Security Deposit
Property Address: [RENTAL PROPERTY ADDRESS]
Lease Period: [START DATE] to [END DATE]

Dear [Landlord's Name],

I am writing to formally demand the return of my security deposit in the amount of $[DEPOSIT AMOUNT] for the above-referenced rental property. I vacated the premises on [MOVE-OUT DATE], which is now [NUMBER] days ago.

According to [STATE] law, landlords must return security deposits within [TIME PERIOD] days of tenant move-out, along with an itemized list of any deductions. As this deadline has passed without receiving my deposit or any communication regarding deductions, I am entitled to the full return of my deposit.

The property was left in excellent condition with only normal wear and tear. I have photographs documenting the condition of the property upon move-out, which I am prepared to provide if necessary.

I am requesting the immediate return of my full security deposit of $[DEPOSIT AMOUNT]. If you believe you are entitled to any deductions, please provide a detailed, itemized list with receipts as required by law.

Please remit payment within [NUMBER] days of receiving this letter. If I do not receive my deposit or a satisfactory explanation for any deductions, I will be forced to pursue other legal remedies, including filing a complaint in small claims court and seeking additional damages as allowed by law.

I can be reached at [PHONE NUMBER] or [EMAIL ADDRESS] to arrange return of the deposit.

Thank you for your prompt attention to this matter.

Sincerely,

[Your Signature]
[Your Printed Name]

Enclosures: Copy of lease agreement, move-out inspection photos`,
    usageInstructions: `Fill in all bracketed information with your specific details. Keep copies of all communications. Send via certified mail for proof of delivery. Check your state's specific laws for deposit return timeframes and penalty provisions.`,
    category: 'tenant-complaint',
    isPremium: true,
    price: '0.01',
  },
  {
    title: 'Workplace Harassment Complaint Letter',
    body: `[Your Name]
[Your Position]
[Department]
[Date]

[HR Manager/Supervisor Name]
[Title]
[Company Name]
[Address]

RE: Formal Complaint of Workplace Harassment

Dear [HR Manager/Supervisor Name],

I am writing to file a formal complaint regarding workplace harassment that I have been experiencing. I am bringing this to your attention so that the company can take appropriate action to address this serious matter.

**Details of Harassment:**
- Harasser: [Name and position of person(s)]
- Date(s) of incidents: [List specific dates]
- Location(s): [Where incidents occurred]
- Witnesses: [Names of any witnesses]

**Description of Incidents:**
[Provide detailed description of each incident, including what was said or done, when it occurred, and who was present. Be specific and factual.]

**Impact:**
This harassment has created a hostile work environment and has affected my ability to perform my job effectively. [Describe specific impacts on your work, health, or well-being.]

**Previous Actions Taken:**
[Describe any previous attempts to address the issue, including dates and people involved.]

**Requested Action:**
I request that the company:
1. Conduct a thorough investigation of these incidents
2. Take appropriate disciplinary action against the harasser
3. Ensure that I am protected from retaliation
4. Implement measures to prevent future harassment
5. Provide me with updates on the investigation's progress

I have documented these incidents and am prepared to provide additional information as needed. I trust that the company will take this matter seriously and act promptly to resolve it.

I am available to discuss this matter further at your convenience. Please contact me at [phone number] or [email address].

Thank you for your immediate attention to this matter.

Sincerely,

[Your Signature]
[Your Printed Name]
[Date]

Attachments: [List any supporting documentation]`,
    usageInstructions: `Document everything before filing. Keep copies of all communications. Follow your company's complaint procedures. Consider consulting with an employment attorney for serious cases. File EEOC complaint if internal process fails.`,
    category: 'workplace-complaint',
    isPremium: true,
    price: '0.01',
  },
  {
    title: 'Consumer Complaint Letter',
    body: `[Your Name]
[Your Address]
[City, State, ZIP Code]
[Your Phone Number]
[Your Email]

[Date]

[Company Name]
[Customer Service Department]
[Address]
[City, State, ZIP Code]

RE: Complaint Regarding [Product/Service] - Order #[ORDER NUMBER]

Dear Customer Service Manager,

I am writing to express my dissatisfaction with [product/service] purchased from your company and to request a resolution to this matter.

**Purchase Details:**
- Date of purchase: [DATE]
- Order/Receipt number: [NUMBER]
- Product/Service: [DESCRIPTION]
- Amount paid: $[AMOUNT]
- Payment method: [CREDIT CARD/CHECK/CASH]

**Problem Description:**
[Clearly describe the problem with the product or service. Be specific about what went wrong, when you discovered the problem, and how it differs from what was promised or expected.]

**Previous Contact Attempts:**
[Describe any previous attempts to resolve the issue, including dates, names of people spoken to, and outcomes.]

**Resolution Requested:**
I am requesting [specific resolution - refund, replacement, repair, etc.]. I believe this is reasonable given [explain why your requested resolution is appropriate].

**Supporting Documentation:**
I have enclosed copies of [list any supporting documents such as receipts, warranties, photos, etc.].

I have been a loyal customer of [Company Name] and hope we can resolve this matter quickly and amicably. Please contact me within [timeframe] days to discuss how we can resolve this issue.

If I do not hear from you within this timeframe, I will be forced to pursue other remedies, including filing complaints with the Better Business Bureau, state consumer protection agency, and considering legal action.

I can be reached at [phone number] during business hours or via email at [email address].

Thank you for your prompt attention to this matter.

Sincerely,

[Your Signature]
[Your Printed Name]

Enclosures: [List attached documents]`,
    usageInstructions: `Keep copies of all documents. Send via certified mail for important purchases. Be specific about desired resolution. Give reasonable timeframe for response. Escalate to consumer protection agencies if needed.`,
    category: 'consumer-complaint',
    isPremium: true,
    price: '0.01',
  },
];

export async function seedDatabase() {
  try {
    console.log('Seeding rights modules...');
    
    // Insert rights modules
    for (const module of SAMPLE_RIGHTS_MODULES) {
      await db.insert(rightsModules).values(module);
    }
    
    console.log('Seeding templates...');
    
    // Insert templates
    for (const template of SAMPLE_TEMPLATES) {
      await db.insert(templates).values(template);
    }
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}
