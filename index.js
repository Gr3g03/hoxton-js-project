
const state = {
    companies: [],
    reviews: [],
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

function getReviewsFromServer() {
    return fetch('http://localhost:3000/reviews')
        .then(function (resp) {
            return resp.json()
        })
}

function deleteReviewFromServer(id) {
    return fetch(`http://localhost:3000/reviews/${id}`, {
        method: "DELETE"
    }).then(resp => resp.json())
}

function createReviewsOnServer(id, content) {
    return fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            content: content
        })
    }).then(resp => resp.json())
}

function updateReviewsOnServer(content) {
    return fetch(`http://localhost:3000/reviews/${reviews.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).then(resp => resp.json())
}

function createJobOnServer(company_name, title, description) {
    return fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            company_name: company_name,
            title: title,
            description: description
        })
    }).then(resp => resp.json())
}

function filterSearchedElements(companies) {
    let elementsToDisplay = companies
    if (state.searchByLocation !== '') {
        elementsToDisplay = elementsToDisplay.filter(items => {
            return items.company_name.toLowerCase().includes(state.searchByLocation.toLocaleLowerCase()
            )
        })
    }

    return elementsToDisplay
}

function companiesToDisplay() {
    let companiesToDisplay = filterSearchedElements(state.companies)

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
    uploadALi.textContent = 'Sing Up'
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
    imgEl.setAttribute('src', item.images)
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
    imageEL.setAttribute('src', state.selectedItem.images)
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

    const addReviewForm = document.createElement('form')
    addReviewForm.setAttribute('class', 'comment-form')

    const userInputReview = document.createElement('input')
    userInputReview.setAttribute('type', 'text')
    userInputReview.setAttribute('class', 'comment-input')
    userInputReview.setAttribute('placeholder', 'Enter your comment...')
    userInputReview.setAttribute('name', 'comment')

    addReviewForm.append(userInputReview)

    addReviewForm.addEventListener('submit', function (event) {
        event.preventDefault()

        createReviewsOnServer(state.id, addReviewForm.comment.value).then(
            function (newReviewFromServer) {
                state.reviews.push(newReviewFromServer)

                render()
            }
        )
    })

    const previewBox = document.createElement('div')


    for (const comment of state.reviews) {
        const pReview = document.createElement('p')
        pReview.setAttribute('class', 'text-review')
        pReview.textContent = comment.content

        const reviewBtn = document.createElement('button')
        reviewBtn.setAttribute('class', 'review-btn')
        reviewBtn.textContent = 'x'
        reviewBtn.addEventListener('click', function () {
            deleteReviewFromServer(comment.id)
            // render()
        })
        pReview.append(reviewBtn)
        previewBox.append(pReview)
    }



    reviewDiv.append(h3TitleReview, previewBox, addReviewForm)

    companyWraper.append(wraperReviewsDiv)

    /// form section

    const formSection = document.createElement('section')
    formSection.setAttribute('class', 'form-section')

    const reviewsForm = document.createElement('form')
    reviewsForm.setAttribute('class', 'add-reviws-form')
    formSection.append(reviewsForm)
    formSection.addEventListener('submit', function (event) {
        event.preventDefault()

        createJobOnServer(reviewsForm.companyname.value, reviewsForm.title.value,
            reviewsForm.description.value)
            .then(function (reviewsFromServer) {
                state.companies.push(reviewsFromServer)
            })
    })


    // const inputImgEl = document.createElement('input')
    // inputImgEl.setAttribute('class', 'input-img')
    // inputImgEl.setAttribute('type', 'text')
    // inputImgEl.setAttribute('placeholder', 'Enter image Url')
    // inputImgEl.setAttribute('name', 'img')


    const companyNameEl = document.createElement('input')
    companyNameEl.setAttribute('type', 'text')
    companyNameEl.setAttribute('class', 'input-company-name')
    companyNameEl.setAttribute('placeholder', 'Enter company name')
    companyNameEl.setAttribute('name', 'companyname')

    const titleNameEl = document.createElement('input')
    titleNameEl.setAttribute('class', 'input-title')
    titleNameEl.setAttribute('type', 'text')
    titleNameEl.setAttribute('placeholder', 'Enter job title')
    titleNameEl.setAttribute('name', 'title')

    const descriptionEl = document.createElement('input')
    descriptionEl.setAttribute('class', 'description-el')
    descriptionEl.setAttribute('type', 'text')
    descriptionEl.setAttribute('placeholder', 'Enter description')
    descriptionEl.setAttribute('name', 'description')

    const submitBtn = document.createElement('button')
    submitBtn.setAttribute('class', 'submit-button')
    submitBtn.setAttribute('type', 'submit')
    submitBtn.textContent = 'Submit'

    // inputImgEl,
    reviewsForm.append(companyNameEl, titleNameEl, descriptionEl, submitBtn)

    // Footer Reviews

    const footerReviews = document.createElement('section')
    footerReviews.setAttribute('class', 'footer-reviews-section')
    const displayJobs = document.createElement('div')
    displayJobs.setAttribute('class', 'job-section')
    for (const job of state.companies) {

        const divel = document.createElement('div')
        divel.setAttribute('class', 'div-container')

        const titleJob = document.createElement('h4')
        titleJob.setAttribute('class', 'title-job-footer-reviews')
        titleJob.textContent = job.title

        const companyNameFooter = document.createElement('h5')
        companyNameFooter.setAttribute('class', 'company-name-footer-reviews')
        companyNameFooter.textContent = job.company_name

        const pDescription = document.createElement('p')
        pDescription.setAttribute('class', 'description-footer-reviews')
        pDescription.textContent = job.description
        divel.append(titleJob, companyNameFooter, pDescription)
        displayJobs.append(divel)
    }
    footerReviews.append(displayJobs)

    mainEl.append(companyWraper, formSection, footerReviews)




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

            state.searchByLocation = searchform.searchByLocation.value
            // state.searchByType = searchform.searchByType.value
            render()
        })

        const inputJobEl = document.createElement('input')
        inputJobEl.setAttribute('class', 'search-box-title')
        inputJobEl.setAttribute('type', 'search')
        inputJobEl.setAttribute('name', 'searchByType')
        inputJobEl.setAttribute('placeholder', 'Enter company name')

        const inputCityEl = document.createElement('input')
        inputCityEl.setAttribute('class', 'search-box-city')
        inputJobEl.setAttribute('name', 'searchByLocation')
        inputCityEl.setAttribute('type', 'search')
        inputCityEl.setAttribute('placeholder', 'Enter your location')

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
            // filterSearchedElements()


        }

        for (const item of state.companies) {
            sugestedCategorie(item, suggestedSearches)
            // filterSearchedElements()

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


    const signInForm = document.createElement('form')
    signInForm.setAttribute('class', 'signin-form')
    signInForm.addEventListener('submit', function (event) {
        event.preventDefault()
        signIn(emailInput.value, passwordInput.value)
        state.modal = ''

        render()
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

function signIn(id, password) {
    return fetch(`http://localhost:3000/users/${id}`)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (user) {
            if (user.password === password) {
                alert('Welcome')
                state.user = user
                render()
            } else {
                alert('Wrong email/password. Please try again.')
            }
        })
}

function renderModal() {
    if (state.modal === '') return

    if (state.modal === 'user') signInModal()
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

    const maleLabel = document.createElement('label')
    maleLabel.textContent = 'Guys'
    const maleGenderInput = document.createElement('input')
    maleGenderInput.setAttribute('class', 'gender')
    maleGenderInput.setAttribute('name', 'gender')
    maleGenderInput.setAttribute('type', 'radio')
    maleGenderInput.setAttribute = ('value', 'Male')
    maleLabel.append(maleGenderInput)


    const feMaleLabel = document.createElement('label')
    feMaleLabel.textContent = 'Girls'
    const femaleGenderInput = document.createElement('input')
    femaleGenderInput.setAttribute('class', 'gender')
    femaleGenderInput.setAttribute('name', 'gender')
    femaleGenderInput.setAttribute('type', 'radio')
    femaleGenderInput.setAttribute = ('value', 'Female')
    feMaleLabel.append(femaleGenderInput)

    const saleLabel = document.createElement('label')
    saleLabel.textContent = 'Sale'
    const saleGenderInput = document.createElement('input')
    saleGenderInput.setAttribute('class', 'gender')
    saleGenderInput.setAttribute('name', 'gender')
    saleGenderInput.setAttribute('type', 'radio')
    saleGenderInput.setAttribute = ('value', 'Female')
    saleLabel.append(saleGenderInput)

    genderLabel.append(p4el, maleLabel, feMaleLabel, saleLabel)


    const RoleLabel = document.createElement('label')
    RoleLabel.setAttribute('class', 'role-Label')
    const p5el = document.createElement('p')
    p5el.textContent = 'Role'


    const employerLabel = document.createElement('label')
    employerLabel.textContent = 'Employer'
    const employerInput = document.createElement('input')
    employerInput.setAttribute('class', 'role')
    employerInput.setAttribute('name', 'role')
    employerInput.setAttribute('type', 'radio')
    employerLabel.append(employerInput)

    const jobSeekerLabel = document.createElement('label')
    jobSeekerLabel.textContent = 'Employee'
    const jobSeeker = document.createElement('input')
    jobSeeker.setAttribute('class', 'role')
    jobSeeker.setAttribute('name', 'role')
    jobSeeker.setAttribute('type', 'radio')
    jobSeekerLabel.append(jobSeeker)

    RoleLabel.append(p5el, employerLabel, jobSeekerLabel)


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
    signInBtn.textContent = 'SIGN UP'
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
    renderModal()
    renderFooter()
}


function init() {

    fetchDataFromServer().then(function (companiesData) {
        state.companies = companiesData
        render()
    })
    getReviewsFromServer().then(function (review) {
        state.reviews = review
        render()
    })

}
init()
