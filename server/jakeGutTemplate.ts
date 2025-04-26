import { Resume } from "@shared/schema";

// Jake Gut inspired resume template
export function generateJakeGutTemplate(resumeData: Resume): string {
  return `
    <style>
      /* Main styles inspired by Jake Gut's resume template */
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #333;
        line-height: 1.5;
        font-size: 13px;
      }
      .resume-container {
        max-width: 100%;
        margin: 0 auto;
      }
      /* Header section */
      .header {
        text-align: center;
        margin-bottom: 10px;
      }
      .header h1 {
        font-size: 24px;
        font-weight: bold;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #222;
      }
      .contact-info {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 5px;
        font-size: 11px;
      }
      .contact-info a {
        color: #2D7788;
        text-decoration: none;
      }
      .contact-item {
        display: flex;
        align-items: center;
      }
      .contact-item i {
        margin-right: 5px;
      }
      
      /* Section styles */
      .section {
        margin-bottom: 15px;
        page-break-inside: avoid;
      }
      .section-heading {
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #444;
        border-bottom: 1px solid #999;
        margin-bottom: 10px;
        padding-bottom: 3px;
      }
      
      /* Experience items */
      .experience-item, .education-item {
        margin-bottom: 12px;
        page-break-inside: avoid;
      }
      .item-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .company, .institution {
        font-weight: bold;
        font-size: 12px;
      }
      .position, .degree {
        font-weight: normal;
        font-style: italic;
        font-size: 12px;
      }
      .period {
        font-size: 11px;
        color: #555;
        min-width: 120px;
        text-align: right;
      }
      
      /* Lists */
      .achievements {
        margin: 5px 0 0 0;
        padding-left: 18px;
        list-style-type: disc;
      }
      .achievements li {
        margin-bottom: 5px;
        padding-left: 5px;
        line-height: 1.4;
      }
      
      /* Skills section */
      .skills-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .skill-category {
        display: flex;
      }
      .skill-category-name {
        font-weight: bold;
        min-width: 120px;
      }
      .skill-list {
        display: flex;
        flex-wrap: wrap;
        gap: 5px 8px;
      }
      .summary {
        text-align: justify;
        hyphens: auto;
      }
    </style>

    <div class="resume-container">
      <!-- Header -->
      <div class="header">
        <h1>${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}</h1>
        <div class="contact-info">
          ${resumeData.personalInfo.email ? `<span class="contact-item"><i>📧</i> ${resumeData.personalInfo.email}</span>` : ''}
          ${resumeData.personalInfo.phone ? `<span class="contact-item"><i>📱</i> ${resumeData.personalInfo.phone}</span>` : ''}
          ${resumeData.personalInfo.location ? `<span class="contact-item"><i>📍</i> ${resumeData.personalInfo.location}</span>` : ''}
          ${resumeData.personalInfo.linkedin ? `<span class="contact-item"><i>🔗</i> ${resumeData.personalInfo.linkedin}</span>` : ''}
          ${resumeData.personalInfo.portfolio ? `<span class="contact-item"><i>🌐</i> ${resumeData.personalInfo.portfolio}</span>` : ''}
        </div>
      </div>

      <!-- Summary Section -->
      ${resumeData.summary ? `
      <div class="section">
        <h2 class="section-heading">Summary</h2>
        <p class="summary">${resumeData.summary}</p>
      </div>
      ` : ''}

      <!-- Experience Section -->
      ${resumeData.experience.length > 0 ? `
      <div class="section">
        <h2 class="section-heading">Experience</h2>
        ${resumeData.experience.map(exp => `
          <div class="experience-item">
            <div class="item-header">
              <div>
                <div class="company">${exp.company}</div>
                <div class="position">${exp.title}${exp.location ? ` | ${exp.location}` : ''}</div>
              </div>
              <div class="period">${exp.period}</div>
            </div>
            ${exp.achievements && exp.achievements.length > 0 ? `
              <ul class="achievements">
                ${exp.achievements.filter(achievement => achievement.trim()).map(achievement => `
                  <li>${achievement}</li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- Education Section -->
      ${resumeData.education.length > 0 ? `
      <div class="section">
        <h2 class="section-heading">Education</h2>
        ${resumeData.education.map(edu => `
          <div class="education-item">
            <div class="item-header">
              <div>
                <div class="institution">${edu.institution}</div>
                <div class="degree">${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</div>
              </div>
              <div class="period">${edu.period}</div>
            </div>
            ${(edu.gpa || edu.additionalInfo) ? `
              <div style="font-size: 11px; margin-top: 3px; color: #555;">
                ${edu.gpa ? `GPA: ${edu.gpa}` : ''} 
                ${(edu.gpa && edu.additionalInfo) ? ' | ' : ''}
                ${edu.additionalInfo || ''}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- Skills Section -->
      ${resumeData.skills.length > 0 ? `
      <div class="section">
        <h2 class="section-heading">Skills</h2>
        <div class="skills-section">
          <div class="skill-category">
            <div class="skill-list">
              ${resumeData.skills.filter(skill => skill.trim()).map(skill => `
                <span>${skill}</span>${resumeData.skills.indexOf(skill) < resumeData.skills.length - 1 ? ' •' : ''}
              `).join(' ')}
            </div>
          </div>
        </div>
      </div>
      ` : ''}

      <!-- Certifications Section -->
      ${resumeData.certifications.length > 0 ? `
      <div class="section">
        <h2 class="section-heading">Certifications</h2>
        <ul class="achievements">
          ${resumeData.certifications.map(cert => `
            <li>${cert.name} ${cert.issuer ? `(${cert.issuer})` : ''} ${cert.date ? `- ${cert.date}` : ''}</li>
          `).join('')}
        </ul>
      </div>
      ` : ''}
    </div>
  `;
}