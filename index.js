
const state = {
    companies: '',
    user: null,
    pages: ['find jobs', 'find saleries', 'company reviews', 'upload resume', 'sign in'],
    selectedPage: '',
    modal: '',
    searchByLocation: '',
    searchByType: '',
    selectedItem: null
}


function fetchDataFromServer() {
    return fetch('http://localhost:3000/data')
        .then(function (resp) {
            return resp.json()
        })
}


function deleteReviewFromServer() {
    return fetch(`http://localhost:3000/reviews/${id}`, {
        method: "DELETE"
    });
}

function filterSearchedElements() {
    if (state.searchByLocation !== '') {
        let elemetsToDisplay = state.companies
        elemetsToDisplay = elemetsToDisplay.filter(items => {
            return items.company_name.toLowerCase().includes(state.searchByLocation.toLocaleLowerCase())
        })
    }
}

function companiesToDisplay() {
    let companiesToDisplay = state.companies

    return companiesToDisplay = companiesToDisplay.slice(0, 6)
}

function renderHeader() {

    const headerEl = document.createElement('header')
    document.body.append(headerEl)

    //Left Header
    const leftHeader = document.createElement('section')
    leftHeader.setAttribute('class', 'left-header')
    headerEl.append(leftHeader)

    const leftHeaderNav = document.createElement('nav')
    leftHeader.append(leftHeaderNav)

    const leftNavUl = document.createElement('ul')
    leftNavUl.setAttribute('class', 'left-nav')
    leftHeaderNav.append(leftNavUl)

    const findJobsLi = document.createElement('li')
    findJobsLi.setAttribute('class', 'left-nav-items')
    const findJobsAEl = document.createElement('a')
    findJobsAEl.setAttribute('href', '#')
    findJobsAEl.textContent = 'Find Jobs'
    findJobsAEl.addEventListener('click', function () {
        state.selectedPage = 'Find Jobs'
        state.selectedItem = null
        state.searchByLocation = ''
        state.searchByType = ''
        render()
    })
    findJobsLi.append(findJobsAEl)

    const findSalariesLi = document.createElement('li')
    findSalariesLi.setAttribute('class', 'left-nav-items')
    const findSalariesAEl = document.createElement('a')
    findSalariesAEl.setAttribute('href', '#')
    findSalariesAEl.textContent = 'Find Salaries'
    findSalariesLi.append(findSalariesAEl)

    const reviewsLi = document.createElement('li')
    reviewsLi.setAttribute('class', 'left-nav-items')
    const reviewsAEl = document.createElement('a')
    reviewsAEl.setAttribute('href', '#')
    reviewsAEl.textContent = 'Company Reviews'
    reviewsAEl.addEventListener('click', function () {
        state.selectedPage = 'Company Reviews'
        state.selectedItem = null

        render()
    })
    reviewsLi.append(reviewsAEl)

    const headerLogoLi = document.createElement('li')
    headerLogoLi.setAttribute('class', 'header-logo')
    const headerLogoAEl = document.createElement('a')
    headerLogoAEl.setAttribute('href', '#')
    const headerLogoh1 = document.createElement('h1')
    headerLogoh1.textContent = 'LOGO'
    headerLogoLi.append(headerLogoAEl)
    headerLogoAEl.append(headerLogoh1)


    leftNavUl.append(findJobsLi, findSalariesLi, reviewsLi, headerLogoLi)

    //Right Header

    const rightHeader = document.createElement('section')
    rightHeader.setAttribute('class', 'right-header')
    headerEl.append(rightHeader)

    const rightNav = document.createElement('nav')
    rightNav.setAttribute('class', 'right-nav')
    rightHeader.append(rightNav)

    const rightNavUl = document.createElement('ul')
    rightNavUl.setAttribute('class', 'right-nav')
    rightNav.append(rightNavUl)

    const uploadLi = document.createElement('li')
    uploadLi.setAttribute('class', 'upload')
    const uploadALi = document.createElement('a')
    uploadALi.setAttribute('href', '#')
    uploadALi.textContent = 'Upload Resume'
    uploadALi.addEventListener('click', function () {
        state.modal = 'upload resume'
        UploadModal(uploadALi)

    })
    uploadLi.append(uploadALi)

    const signInLi = document.createElement('li')
    signInLi.setAttribute('class', 'sign-in')
    const signInALi = document.createElement('a')
    signInALi.setAttribute('href', '#')
    signInALi.textContent = 'Sign In'
    signInALi.addEventListener('click', function () {
        state.modal = 'sign in'
        signInModal(signInALi)

    })
    signInLi.append(signInALi)

    rightNavUl.append(uploadLi, signInLi)

}


function renderTopJobsSection(item, recentSearches) {

    const recentSearchesContainer = document.createElement('div')
    recentSearchesContainer.setAttribute('class', 'recent-searches__')

    recentSearchesContainer.addEventListener('click', function () {
        state.selectedItem = item
        render()
    })

    const divinfoEL = document.createElement('div')
    divinfoEL.setAttribute('class', 'company-info ')


    const divLogoEL = document.createElement('div')
    divLogoEL.setAttribute('class', 'logo')

    const imgEl = document.createElement('img')
    imgEl.setAttribute('class', 'logo-img')
    imgEl.setAttribute('src', './assets/accounting.svg')
    imgEl.setAttribute('alt', '#')

    divLogoEL.append(imgEl)

    const companyName = document.createElement('div')
    companyName.setAttribute('class', 'job-possition')

    const h2JobInfo = document.createElement('h2')
    h2JobInfo.textContent = item.title
    companyName.append(h2JobInfo)

    const companyDataEl = document.createElement('div')
    companyDataEl.setAttribute('class', 'company-data')

    const ulEL = document.createElement('ul')
    const li1El = document.createElement('li')
    li1El.textContent = `${item.company_name}`

    const li2El = document.createElement('li')
    li2El.textContent = `${item.location}`

    const li3El = document.createElement('li')
    li3El.textContent = `$${item.salary}`

    ulEL.append(li1El, li2El, li3El)

    companyDataEl.append(ulEL)
    divinfoEL.append(companyName, companyDataEl)
    // const abutInfoEl = document.createElement('div')
    // abutInfoEl.setAttribute('about-info')
    // const h31el = document.createElement('h3')
    // h31el.textContent = 'full time'
    // const h32el = document.createElement('h3')
    // h32el.textContent = 'x-hours'
    // abutInfoEl.append(h31el, h32el)
    recentSearchesContainer.append(divLogoEL, divinfoEL)
    recentSearches.append(recentSearchesContainer)
}

function sugestedCategorie(item, suggestedSearches) {

    const suggesteddivEL = document.createElement('div')
    suggesteddivEL.setAttribute('class', 'suggested')
    // suggesteddivEL.addEventListener('click', function () {
    //     state.selectedItem = item
    //     console.log('hello')
    //     render()
    // })

    const svgEL = document.createElement('img')
    svgEL.setAttribute('class', 'sugested-svg')
    svgEL.setAttribute('src', './assets/accounting.svg')
    svgEL.setAttribute('alt', 'name')

    const industryName = document.createElement('h3')
    industryName.textContent = item.tag


    suggestedSearches.append(suggesteddivEL)

    suggesteddivEL.append(svgEL, industryName)


}

function companyReviews(mainEl) {
    const companyWraper = document.createElement('section')
    companyWraper.setAttribute('class', 'company-wraper')

    const contentDiv = document.createElement('div')
    contentDiv.setAttribute('class', 'company-content')

    const imageEL = document.createElement('img')
    imageEL.setAttribute('class', 'product__img')
    imageEL.setAttribute('src', `./assets/accounting.svg`)
    imageEL.setAttribute('alt', '#')


    const companyName = document.createElement('h2')
    companyName.setAttribute('class', 'product-name')
    companyName.textContent = state.selectedItem.company_name

    const jobPositoin = document.createElement('h4')
    jobPositoin.setAttribute('class', 'job-possition')
    jobPositoin.textContent = state.selectedItem.slug

    const jobDescription = document.createElement('p')
    jobDescription.setAttribute('class', 'job-description')
    jobDescription.textContent = state.selectedItem.description
    contentDiv.append(imageEL, companyName, jobPositoin, jobDescription)


    companyWraper.append(contentDiv)

    const wraperReviewsDiv = document.createElement('div')
    wraperReviewsDiv.setAttribute('class', 'wraper-reviews')

    const reviewsTitle = document.createElement('h2')
    reviewsTitle.setAttribute('class', 'reviews-head-title')
    reviewsTitle.textContent = 'Company Reviews'

    const reviewDiv = document.createElement('div')
    reviewDiv.setAttribute('class', 'review-div')
    wraperReviewsDiv.append(reviewsTitle, reviewDiv)

    const h3TitleReview = document.createElement('h3')
    h3TitleReview.setAttribute('class', 'company-title-review')
    h3TitleReview.textContent = 'Leave a review'

    const userInputReview = document.createElement('input')


    const pReview = document.createElement('p')
    pReview.setAttribute('class', 'text-review')
    pReview.textContent = state.selectedItem.content

    const reviewBtn = document.createElement('button')
    reviewBtn.setAttribute('class', 'review-btn')
    reviewBtn.textContent = 'x'

    pReview.append(reviewBtn)
    reviewDiv.append(h3TitleReview, pReview)

    companyWraper.append(wraperReviewsDiv)


    mainEl.append(companyWraper)
}

function prodductPage() {

}




function renderMain() {

    const mainEl = document.createElement('main')

    // -- product details --
    if (state.selectedItem !== null) {
        companyReviews(mainEl)
    }
    else {
        const searchSection = document.createElement('section')
        searchSection.setAttribute('class', 'search-section')

        const searchform = document.createElement('form')
        searchform.setAttribute('class', 'search-section__')
        searchform.addEventListener('submit', function (event) {
            event.preventDefault()

            state.searchByLocation = searchform.search.value
            // state.searchByType = searchform.search.value
            render()
        })

        const inputJobEl = document.createElement('input')
        inputJobEl.setAttribute('class', 'search-box-title')
        inputJobEl.setAttribute('type', 'search')
        inputJobEl.setAttribute('name', 'search')
        inputJobEl.setAttribute('placeholder', 'job title, keywords')

        const inputCityEl = document.createElement('input')
        inputCityEl.setAttribute('class', 'search-box-city')
        inputJobEl.setAttribute('name', 'search')
        inputCityEl.setAttribute('type', 'search')
        inputCityEl.setAttribute('placeholder', 'city, state')

        const searchButton = document.createElement('button')
        searchButton.setAttribute('class', 'search-button')
        searchButton.textContent = 'Find Jobs'

        searchform.append(inputJobEl, inputCityEl, searchButton)

        const postFindEl = document.createElement('span')
        postFindEl.setAttribute('class', 'post-find')
        // searchSection.append(postFindEl)

        const h3PostEl = document.createElement('h3')
        const aPostEl = document.createElement('a')
        aPostEl.setAttribute('href', '#')
        aPostEl.textContent = "Post your job"

        h3PostEl.append(aPostEl)

        const h3FindEl = document.createElement('h3')
        const aFindEl = document.createElement('a')
        aFindEl.setAttribute('href', '#')
        aFindEl.textContent = "Find employees"

        h3FindEl.append(aFindEl)
        searchSection.append(searchform, postFindEl)

        postFindEl.append(h3PostEl, h3FindEl)

        const recentSearches = document.createElement('section')
        recentSearches.setAttribute('class', 'recent-searches')


        const suggestedSearches = document.createElement('section')
        suggestedSearches.setAttribute('class', 'suggested-searches')


        for (const item of companiesToDisplay()) {
            renderTopJobsSection(item, recentSearches)
            filterSearchedElements()


        }

        for (const item of state.companies) {
            sugestedCategorie(item, suggestedSearches)
            filterSearchedElements()

        }

        mainEl.append(searchSection, recentSearches, suggestedSearches)
    }
    document.body.append(mainEl)

}



function renderFooter() {
    const footerEl = document.createElement('footer')
    document.body.append(footerEl)

    const footerNav = document.createElement('section')
    footerNav.setAttribute('class', 'footer-nav')
    footerEl.append(footerNav)

    const footerMenuUL = document.createElement('ul')
    footerMenuUL.setAttribute('class', 'footer-nav-menu')
    footerNav.append(footerMenuUL)

    const browseJobsLi = document.createElement('li')
    const browseJobsALi = document.createElement('a')
    browseJobsALi.setAttribute('href', '#')
    browseJobsALi.textContent = "Browse Jobs"
    browseJobsLi.append(browseJobsALi)

    const browseCompaniesLi = document.createElement('li')
    const browseCompaniesALi = document.createElement('a')
    browseCompaniesALi.setAttribute('href', '#')
    browseCompaniesALi.textContent = "Browse Companies"
    browseCompaniesLi.append(browseCompaniesALi)

    const salariesLi = document.createElement('li')
    const salariesALi = document.createElement('a')
    salariesALi.setAttribute('href', '#')
    salariesALi.textContent = "Salaries"
    salariesLi.append(salariesALi)

    const findReviewsLi = document.createElement('li')
    const findReviewsALi = document.createElement('a')
    findReviewsALi.setAttribute('href', '#')
    findReviewsALi.textContent = "Find Reviews"
    findReviewsLi.append(findReviewsALi)


    const privacyLi = document.createElement('li')
    const privacyALi = document.createElement('a')
    privacyALi.setAttribute('href', '#')
    privacyALi.textContent = "Privacy"
    privacyLi.append(privacyALi)

    footerMenuUL.append(browseJobsLi, browseCompaniesLi, salariesLi, findReviewsLi, privacyLi)

    const footerEnd = document.createElement('section')
    footerEnd.setAttribute('class', 'footer-nav__')
    footerEl.append(footerEnd)


    const h2FooteerEl = document.createElement('h2')
    h2FooteerEl.textContent = "Let employers find you"

    const h3FooterEl = document.createElement('h3')
    const h3AFooter = document.createElement('a')
    h3AFooter.setAttribute('href', './pages/uploadcv.html')
    h3AFooter.textContent = 'Upload your resume'
    h3FooterEl.append(h3AFooter)

    footerEnd.append(h2FooteerEl, h3FooterEl)


}




function signInModal() {
    const searchBtnWrapper = document.createElement('div')
    searchBtnWrapper.setAttribute('class', 'modal-wrapper')
    searchBtnWrapper.addEventListener('click', function () {
        state.modal = ''
        render()
    })

    const btnwrapper = document.createElement('div')
    btnwrapper.setAttribute('class', 'btn-wrapper')
    btnwrapper.addEventListener('click', function (event) {
        event.stopPropagation()
    })

    // const closeModal = document.createElement('button')
    // closeModal.setAttribute('class', 'modal-close-btn')
    // closeModal.textContent = 'X'
    // closeModal.addEventListener('click', function btn() {
    //     state.modal = ''
    //     render()
    // })

    const signInForm = document.createElement('form')
    signInForm.setAttribute('class', 'signin-form')
    signInForm.addEventListener('submit', function (event) {
        event.preventDefault()

    })

    const emailLabel = document.createElement('label')
    emailLabel.setAttribute('name', 'emailinput')
    const pel = document.createElement('p')
    pel.textContent = 'Email'

    const emailInput = document.createElement('input')
    emailInput.setAttribute('class', 'email-input')
    emailInput.setAttribute('type', 'email')
    emailInput.setAttribute('name', 'emailinput')

    emailLabel.append(pel, emailInput)

    const passwordLabel = document.createElement('label')
    passwordLabel.setAttribute('name', 'passwbutton')
    const p2el = document.createElement('p')
    p2el.textContent = 'Password'

    const passwordInput = document.createElement('input')
    passwordInput.setAttribute('class', 'password-input')
    passwordInput.setAttribute('type', 'password')
    passwordInput.setAttribute('name', 'passwbutton')

    passwordLabel.append(p2el, passwordInput)

    const signInBtnLabel = document.createElement('label')

    const signInBtn = document.createElement('button')
    signInBtn.textContent = 'SIGN IN'
    signInBtn.setAttribute('class', 'signin-button')

    signInBtnLabel.append(signInBtn)

    const titleEL = document.createElement('h2')
    titleEL.textContent = 'login'


    signInForm.append(emailLabel, passwordLabel, signInBtnLabel)

    btnwrapper.append(titleEL, signInForm)
    // closeModal
    searchBtnWrapper.append(btnwrapper)
    document.body.append(searchBtnWrapper)
}


function UploadModal() {
    const searchBtnWrapper = document.createElement('div')
    searchBtnWrapper.setAttribute('class', 'modal-wrapper')
    searchBtnWrapper.addEventListener('click', function () {
        state.modal = ''
        render()
    })

    const btnwrapper = document.createElement('div')
    btnwrapper.setAttribute('class', 'btn-wrapper')
    btnwrapper.addEventListener('click', function (event) {
        event.stopPropagation()
    })


    const signInForm = document.createElement('form')
    signInForm.setAttribute('class', 'sign-in-form')
    signInForm.addEventListener('submit', function (event) {
        event.preventDefault()

    })
    const nameLabel = document.createElement('label')
    nameLabel.setAttribute('name', 'nameInput')
    const p1el = document.createElement('p')
    p1el.textContent = 'Name'

    const nameInput = document.createElement('input')
    nameInput.setAttribute('class', 'name-input')
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('name', 'nameinput')

    nameLabel.append(p1el, nameInput)

    const lastNameLabel = document.createElement('label')
    lastNameLabel.setAttribute('name', ' lastNameinput')
    const p2el = document.createElement('p')
    p2el.textContent = 'LastName'

    const lastNameInput = document.createElement('input')
    lastNameInput.setAttribute('class', 'last-name-input')
    lastNameInput.setAttribute('type', 'text')
    lastNameInput.setAttribute('name', 'lastNameinput')

    lastNameLabel.append(p2el, lastNameInput)

    const birthdayLabel = document.createElement('label')
    birthdayLabel.setAttribute('name', ' birthdayeinput')
    const p3el = document.createElement('p')
    p3el.textContent = 'Birthday'

    const BirthdayInput = document.createElement('input')
    BirthdayInput.setAttribute('class', 'birthdayinput')
    BirthdayInput.setAttribute('type', 'number')
    BirthdayInput.setAttribute('name', 'birthdayinput')

    birthdayLabel.append(p3el, BirthdayInput)

    const genderLabel = document.createElement('label')
    genderLabel.setAttribute('class', 'gender-Label')
    const p4el = document.createElement('p')
    p4el.textContent = 'Gender'


    const maleGenderInput = document.createElement('input')
    maleGenderInput.setAttribute('class', 'gender')
    maleGenderInput.setAttribute('name', 'gender')
    maleGenderInput.setAttribute('type', 'radio')


    const femaleGenderInput = document.createElement('input')
    femaleGenderInput.setAttribute('class', 'gender')
    femaleGenderInput.setAttribute('name', 'gender')
    femaleGenderInput.setAttribute('type', 'radio')


    const femaleH4El = document.createElement('h4')
    femaleH4El.textContent = 'Female'
    femaleGenderInput.append(femaleH4El)

    genderLabel.append(p4el, maleGenderInput, femaleGenderInput)


    const RoleLabel = document.createElement('label')
    RoleLabel.setAttribute('class', 'role-Label')
    const p5el = document.createElement('p')
    p5el.textContent = 'Role'


    const employerInput = document.createElement('input')
    employerInput.setAttribute('class', 'role')
    employerInput.setAttribute('name', 'role')
    employerInput.setAttribute('type', 'radio')
    employerInput.textContent = 'Employer'

    const jobSeeker = document.createElement('input')
    jobSeeker.setAttribute('class', 'role')
    jobSeeker.setAttribute('name', 'role')
    jobSeeker.setAttribute('type', 'radio')
    jobSeeker.textContent = 'Job Seeker'

    RoleLabel.append(p5el, employerInput, jobSeeker)


    const emailLabel = document.createElement('label')
    emailLabel.setAttribute('name', 'emailinput')
    const p6el = document.createElement('p')
    p6el.textContent = 'Email'

    const emailInput = document.createElement('input')
    emailInput.setAttribute('class', 'email-input')
    emailInput.setAttribute('type', 'email')
    emailInput.setAttribute('name', 'emailinput')

    emailLabel.append(p6el, emailInput)

    const passwordLabel = document.createElement('label')
    passwordLabel.setAttribute('name', 'passwbutton')
    const p7el = document.createElement('p')
    p7el.textContent = 'Password'

    const passwordInput = document.createElement('input')
    passwordInput.setAttribute('class', 'password-input')
    passwordInput.setAttribute('type', 'password')
    passwordInput.setAttribute('name', 'passwbutton')

    passwordLabel.append(p7el, passwordInput)

    const signInBtnLabel = document.createElement('label')

    const signInBtn = document.createElement('button')
    signInBtn.textContent = 'SIGN IN'
    signInBtn.setAttribute('class', 'signin-button')

    signInBtnLabel.append(signInBtn)

    const titleEL = document.createElement('h2')
    titleEL.textContent = 'Sign Up'


    signInForm.append(nameLabel, lastNameLabel, birthdayLabel, genderLabel, RoleLabel, emailLabel, passwordLabel, signInBtnLabel)

    btnwrapper.append(titleEL, signInForm)
    // closeModal,
    searchBtnWrapper.append(btnwrapper)
    document.body.append(searchBtnWrapper)
}


function render() {
    document.body.innerHTML = ''

    renderHeader()
    renderMain()
    renderFooter()
}


function init() {

    fetchDataFromServer().then(companiesData => state.companies = companiesData)
    fetchDataFromServer().then(function (companiesData) {
        state.companies = companiesData
        render()
    })
}
init()
